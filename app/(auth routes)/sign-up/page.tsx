"use client"
import css from "@/app/(auth routes)/sign-up/SignUpPage.module.css"
import { registration } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { UserRequest } from "@/types/user";
import { ApiError} from "@/types/response";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const setUser = useAuthStore(state => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        try {
            const newUser = Object.fromEntries(formData) as UserRequest;
            const user = await registration(newUser);
            if (user) {
                setUser(user);
                router.push('/profile');
            }
            else {
                setError('Invalid email or password');
            }
        } 
        catch (error) {
            setError(
                (error as ApiError).response?.data?.error ??
                (error as ApiError).message ?? 'Oops... some error');
        }
            
    };
    
  
  return (
    <main className={css.mainContent}>
    <h1 className={css.formTitle}>Registration</h1>
        <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
            Register
        </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
    </form>
    </main>
  )
}