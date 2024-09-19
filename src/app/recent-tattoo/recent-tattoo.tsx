import { createClient } from "@/lib/supabase/server"

export const RecentTattoo = async () => {

    const supabase = createClient();
    const data = await supabase.from("tattoo").select();

    return (
        <div>{JSON.stringify(data)}</div>
    )
}