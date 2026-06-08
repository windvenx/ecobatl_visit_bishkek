import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import PlacesTable from "@/components/admin/PlacesTable";

export const dynamic = "force-dynamic";

export default async function AdminPlacesPage() {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const { data: places } = await supabase
        .from("places")
        .select("*")
        .order("created_at", { ascending: false });

    return <PlacesTable places={places || []} />;
}
