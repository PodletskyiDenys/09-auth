'use client';
import css from "@/app/(private routes)/profile/edit/EditProfilePage.module.css"

import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import { updateUser } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const newUsername = (formData.get('username') as string | null)?.trim();
    if (!newUsername) return;
    if (!user) return;
    await updateUser({ username: newUsername });
    setUser({ ...user, username: newUsername });
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || ''}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user?.username}</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}