"use server";

import { requireAdmin } from "@/lib/auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function savePlaceAction(formData: FormData) {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const id = formData.get("id") as string;
    const name_ru = formData.get("name_ru") as string;
    const name_en = formData.get("name_en") as string;
    const name_ky = formData.get("name_ky") as string;
    const category = formData.get("category") as string;
    const lat = formData.get("lat") as string;
    const lng = formData.get("lng") as string;
    const desc_ru = formData.get("desc_ru") as string;
    const desc_en = formData.get("desc_en") as string;
    const desc_ky = formData.get("desc_ky") as string;
    const hours = formData.get("hours") as string;
    const phone = formData.get("phone") as string;
    const is_published = formData.get("is_published") === "true";

    const placeData = {
        name: { ru: name_ru, en: name_en, ky: name_ky },
        desc: { ru: desc_ru, en: desc_en, ky: desc_ky },
        category,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        hours,
        phone,
        is_published
    };

    if (id) {
        // Update
        const { error } = await supabase.from("places").update(placeData).eq("id", id);
        if (error) throw new Error(error.message);
    } else {
        // Insert
        const { error } = await supabase.from("places").insert([placeData]);
        if (error) throw new Error(error.message);
    }

    revalidatePath("/admin/places");
}

export async function deletePlaceAction(id: string) {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase.from("places").delete().eq("id", id);
    if (error) throw new Error(error.message);

    revalidatePath("/admin/places");
}

export async function togglePublishPlaceAction(id: string, is_published: boolean) {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const { error } = await supabase.from("places").update({ is_published }).eq("id", id);
    if (error) throw new Error(error.message);

    revalidatePath("/admin/places");
}
