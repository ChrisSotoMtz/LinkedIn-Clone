import Head from "next/head";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useRouter } from "next/router";
import Feed from "../Components/Feed";
import { AnimatePresence } from "framer-motion";
import Modal from "../Components/Modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getDb } from "../util/mongodb";
import Widgets from "../Components/Widgets";


export default function Home({ posts, articles }) {

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/home");
    },
  });

  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>LinkedIn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          {/* Feed*/}
          <Feed posts={posts} />
        </div>
        {/* Widgets*/}
        <Widgets articles={articles} />  
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanet: false,
        destination: "/home",
      },
    };
  }

  const { db } = await getDb();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();
  const users = await db.collection("users").find().toArray();

  //googlenewsAPI
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photo: post.photo,
        timestamp: post.timestamp.toString(),
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
}
