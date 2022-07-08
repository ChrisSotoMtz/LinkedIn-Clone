import Head from "next/head";
import Image from "next/image";
import { getSession, signOut, useSession } from "next-auth/react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useRouter } from "next/router";
import Feed from "../Components/Feed";
import { AnimatePresence } from "framer-motion";
import Modal from "../Components/modal";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";



export default function Home() {
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
          <Feed/>
        </div>
        {/* Widgets*/}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType}/>
          )

          }
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

  return {
    props: {
      session,
    },
  };
}
