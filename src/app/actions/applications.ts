"use server";

import { requireAdmin } from "@/lib/auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function approveApplication(application: any) {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    // 1. Update application status
    const { error: appError } = await supabase
        .from("guide_applications")
        .update({ status: "approved" })
        .eq("id", application.id);

    if (appError) throw new Error(appError.message);

    // 2. Create guide record
    const { error: guideError } = await supabase
        .from("guides")
        .insert([{
            name: { ru: application.name, en: application.name, ky: application.name },
            email: application.email,
            phone: application.phone,
            status: "approved"
        }]);

    if (guideError) throw new Error(guideError.message);

    revalidatePath("/admin/applications");
    revalidatePath("/admin/guides");
    revalidatePath("/admin");
}

export async function rejectApplication(id: string) {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase
        .from("guide_applications")
        .update({ status: "rejected" })
        .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/applications");
    revalidatePath("/admin");
}
