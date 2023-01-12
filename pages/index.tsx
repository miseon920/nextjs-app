import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css' //이렇게 쓸경우 반드시 .module을 붙여줘야함
import { GetStaticProps } from 'next'
import { getSortedPostData } from '../lib/post'
import Link from 'next/link'; // link사용을 위해 Next에서는 이렇게 씀

const inter = Inter({ subsets: ['latin'] })

/**
 * pages/post/[...all].js-> /post/* 때문에
 * 우리가 만든 페이지 상세페이지 경로는 
 * pages/posts/2020/id/title 로 표시된다.
 * 
 * 동적으로 바뀌는 부분의 페이지는 [변수].tsx로 만든다! []를 사용하여 적어주어야함
 */
export default function Home({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id:string
  }[] //배열로 들어가있으므로 타입을 이런식으로 적어줘야함
}) {
  return (
    <>
      <Head>
        <title>Sunny</title>
        <meta name="description" content="Sunny" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        {/* 모듈 css사용하기 homd.module를 styles로 지정했기 때문에 styles.원하는클래스이름 으로 쓴다 */}
        <section className={styles.headingMd}>
          <h1>Sunny</h1>
          <div>this is a website</div>
        </section>
        <section className={`${styles.headingMd} ${styles.paddings}`}>
          <h2 className={styles.headingLg}>Blog</h2>
          <ul className={styles.list}>
            {/* 포스트 데이타 받아올곳 */}
              {allPostsData.map(({id,title,date}) => //allPostsData.map(data =>data.id data.title data.date) 로 쓸수도 있지만 간단하게 공통이므로 왼쪽처럼 적는다.
                <li className={styles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>{title}</Link>
                  <div className={styles.lightText}>
                    {date}
                  </div>
                </li>
              )}             
            <li>

            </li>
          </ul>
        </section>
      </div>
      {/* <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {  //getStaticProps : Static Generation으로 빌드할때 데이터를 불러옴(미리 만들어줌)
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData //props를 allPostsData로 넣어주기로 해서 home에 props로 넣어줌
    }
  }
}

/**
 * index.tsx의 경로가  "/" 이다.
 * 
 * #markdown 
 * 
 * 텍스트 기반의 마크업 언어로 쉽게 쓰고 읽을 수 있으며 html로 변환이 가능하다.
 * 특수기호와 문자를 이용한 매우 간단한 구조의 문법을 사용하여 웹에서도 보다 빠르게 컨텐츠를 작성하고
 * 보다 직관적으로 인식 할수 있다.
 *  
 * 
 * #파일 기반 네비게이션 기능
 * 리액트 에서는 route를 위해 react-reuter 라이브러리를 사용하지만 Next.js에서는 페이지 개념을 기반으로 구축된 파일 시스템 기반 라우터가 있음
 * 파일이 페이지 디렉토리에 추가되면 자동으로 경로로 사용할 수 있음.
 * 페이지 디렉토리 내의 파일은 가장 일반적인 패턴을 정의하는대 사용할 수 있음
 * 
 * 예) pages/index.tsx -> /
 * pages/blog/index.tsx -> /blog
 * pages/blog/[slug].js -> /blog/:slug
 * pages/post/[...all].js-> /post/*
 * 
 */