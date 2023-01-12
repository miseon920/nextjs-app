import { GetStaticPaths, GetStaticProps } from 'next'
import {getAllPostIds,getPostData} from '../../lib/post'
import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const Post = ({ postData }: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
  return (
      <div className={styles.container}>
          <Head>
              <title>{postData.title}</title>
          </Head>
          <article>
              <h1 className={styles.headingXl}>{postData.title}</h1>
              <div>
                  {postData.date}
              </div>
              <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}></div>
          </article>
    </div>
  )
}

export default Post

//포스트 데이터를 가져와햐나는 경로 목록 가져오기
export const getStaticPaths: GetStaticPaths = async () => { 
    const paths = getAllPostIds(); //포스트를 생성해준 곳에 함수 만들어서 가져오기, 여기서는 lib > post.ts
    //[{params:{id:`pre-rendering`},{...params}}] 식으로 배열로 들어오게됨
    return {
        paths,
        fallback:false //false라면 getStaticPaths로 리턴되지 않는것은 모두 404페이지가 뜸, true라면 fallback 페이지가 생성됨
    }
}
//전달받은 아이디를 이용하여 해당 포스트의 데이터 가져오기
export const getStaticProps: GetStaticProps = async ({ params }) => { 
    const postData = await getPostData(params?.id as string); //pre-rendering, ssg-ssr이 들어가는곳
    return {
        props: {
            postData
        }
    }
}


/**
 * Static Generation으로 데이터에 기반하여 pre-render시 특정한 동적 라우팅 구현(pages/post/[id].js)
 * 1.포스트 데이터를 가져와햐나는 경로 목록 가져오기
 * 2.전달받은 아이디를 이용하여 해당 포스트의 데이터 가져오기
 * 3.가져온 데이터 화면에 보여주기
 */