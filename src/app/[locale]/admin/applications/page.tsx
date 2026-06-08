import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { requireAdmin } from "@/lib/auth";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
    await requireAdmin();
    const supabase = createServerComponentClient({ cookies });

    const { data: applications } = await supabase
        .from("guide_applications")
        .select("*")
        .order("created_at", { ascending: false });

    return <ApplicationsTable applications={applications || []} />;
}
