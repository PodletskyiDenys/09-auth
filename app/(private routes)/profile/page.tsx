import css from "@/app/(private routes)/profile/ProfilePage.module.css"
import getBaseUrl from "@/lib/api/api";
import { userInfoServer } from "@/lib/api/serverApi";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {    
  metadataBase: new URL (getBaseUrl()),
  title: 'Profile Page | NoteHub',
  description: 'Manage your profile information',
  openGraph: {
    title: `Profile Page | NoteHub`,
    description: 'Manage your profile information',
    url: getBaseUrl(),
    siteName: 'NoteHub',
    images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Profile page',
        },
    ],
    type: 'article',     
  }
};

const pageProfile = async() => {
    const user = await userInfoServer()
    return (
        <main className={css.mainContent}>
        <div className={css.profileCard}>
            <div className={css.header}>
                <h1 className={css.formTitle}>Profile Page</h1>
                <Link href="/profile/edit" className={css.editProfileButton}>
                Edit Profile
                </Link>
            </div>
            <div className={css.avatarWrapper}>
            <Image
                src={user.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
            />
            </div>
            <div className={css.profileInfo}>
            <p>
                Username: {user.username}
            </p>
            <p>
                Email: {user.email}
            </p>
            </div>
        </div>
        </main>
  )
}

export default pageProfile