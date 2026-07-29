import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface AdminUser {
  id: string;
  email: string;
  created_at?: string;
}

/**
 * Sign up admin user
 */
export const adminSignUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "admin",
        },
      },
    });

    if (error) throw error;
    return { success: true, user: data.user };
  } catch (err) {
    console.error("Sign up error:", err);
    throw err;
  }
};

/**
 * Sign in admin user
 */
export const adminSignIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, session: data.session };
  } catch (err) {
    console.error("Sign in error:", err);
    throw err;
  }
};

/**
 * Sign out admin user
 */
export const adminSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Sign out error:", err);
    throw err;
  }
};

/**
 * Get current admin session
 */
export const getCurrentAdmin = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;
    return session?.user as AdminUser | null;
  } catch (err) {
    console.error("Get current admin error:", err);
    return null;
  }
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (
  callback: (user: AdminUser | null) => void
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      callback(session.user as AdminUser);
    } else {
      callback(null);
    }
  });

  return subscription;
};

/**
 * Reset password
 */
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Reset password error:", err);
    throw err;
  }
};

/**
 * Update password
 */
export const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Update password error:", err);
    throw err;
  }
};
