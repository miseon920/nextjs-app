import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' //string주어진 로 앞부분을 구문 분석하고 options객체를 반환합니다.
import { remark } from 'remark';
import remarkHtml from 'remark-html';
//md 파일을 data로 만듬
//npm i gray-matter --save
const postDirectory = path.join(process.cwd(), 'posts'); //posts폴더 경로잡기
//console.log(process.cwd());
//process.cwd() - 폴더 경로가 뜸

//포스트 데이터 생성
export function getSortedPostData() { 
    //posts 파일 이름 잡기
    //readdirSync - 파일경로 읽기
    const fileNames = fs.readdirSync(postDirectory);
    //fileNames - 파일들이 배열로 들어있음
    //console.log(fileNames);
    const allPostsData = fileNames.map(fileName => { 
        const id = fileName.replace(/\.md$/, ""); //정규식으로 .md확장자면 제거하기
        const fullPath = path.join(postDirectory, fileName); //각 md파일들 경로잡기

        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        const matterResult = matter(fileContents); //파일들을 객체 데이터로 변환하기

        return {
            id,
            ...matterResult.data as { date: string; title: string }
            //변환한 파일 넣어주기 - 타입을 써서
        }
    });

    //sorting - 정렬
    return allPostsData.sort((a, b) => { 
        if (a.date < b.date) {
            return 1
        } else { 
            return -1
        }
    })

    //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //개체는 해당 속성 중 하나의 값을 기준으로 정렬 할 수 있습니다.
    //여기서는 date로 정렬함
}

//페이지로 뿌리기 위해 데이터 경로 생성
export function getAllPostIds() { 
    //id 가져오기
    const fileNames = fs.readdirSync(postDirectory); //파일이름이 배열로 들어감

    return fileNames.map(fileName => { 
        return {
            params: {
                id:fileName.replace(/\.md$/, "") // id를 params로 넘겨줌
            }
        }
    })
}

//데이터 내용 뿌리기 위해 html로 변환시킨것
export async function getPostData(id:string){ //파라미터로 id를 넣어줬기 때문
    const fullPath = path.join(postDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath,'utf-8');

    const matterResult = matter(fileContents);//파일들을 객체 데이터로 변환하기
    const processedContent = await remark() //데이터로 가져온 것을 html로 변환하기
    .use(remarkHtml)
    .process(matterResult.content);
    
    const contentHtml = processedContent.toString();
    //npm i remark remark-html --save 설치
    
    return {
        id,
        contentHtml,
        ...(matterResult.data as { data: string;  title: string})
    }
}