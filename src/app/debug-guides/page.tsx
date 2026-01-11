import { createPublicClient } from "../util/supabase-server";

export const revalidate = 0;

export default async function DebugGuidesPage() {
    const supabase = createPublicClient();

    // 1. Fetch from Table
    const tableResult = await supabase.from("travel_guide").select("*");

    // 2. Fetch from RPC
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rpcResult: { data: any; error: any } = { data: null, error: null };
    try {
        rpcResult = await supabase.rpc("get_travel_guides");
    } catch (e) {
        rpcResult = { data: null, error: e };
    }

    return (
        <div className="p-8 font-mono text-sm bg-gray-50 min-h-screen text-slate-800">
            <h1 className="text-2xl font-bold mb-6 text-slate-900">🕵️ Debugging Travel Guides</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-emerald-600">Direct Table Query</h2>
                    <div className="mb-2 font-semibold text-slate-700">
                        Status: {tableResult.error ? <span className="text-red-600">❌ Error</span> : <span className="text-green-600">✅ Success</span>}
                    </div>
                    {tableResult.error && (
                        <div className="text-red-500 mb-4">{tableResult.error.message}</div>
                    )}
                    <pre className="bg-slate-100 p-4 rounded-lg overflow-auto max-h-[500px] text-xs text-slate-700 border border-slate-200">
                        {JSON.stringify(tableResult.data, null, 2)}
                    </pre>
                </div>

                <div className="bg-white p-6 shadow-md rounded-xl border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-blue-600">RPC Query</h2>
                    <div className="mb-2 font-semibold text-slate-700">
                        Status: {rpcResult.error ? <span className="text-red-600">❌ Error</span> : <span className="text-green-600">✅ Success</span>}
                    </div>
                    {rpcResult.error && (
                        <div className="text-red-500 mb-4">{rpcResult.error.message}</div>
                    )}
                    <pre className="bg-slate-100 p-4 rounded-lg overflow-auto max-h-[500px] text-xs text-slate-700 border border-slate-200">
                        {JSON.stringify(rpcResult.data, null, 2)}
                    </pre>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 shadow-md rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-slate-900">Diagnosis</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li><strong>If both are empty:</strong> You need to INSERT data into your `travel_guide` table.</li>
                    <li><strong>If Table has data but RPC is empty/missing columns:</strong> The RPC definition is outdated. My code patch should fix this by preferring the Table query.</li>
                    <li><strong>Check for &apos;category&apos;:</strong> Search the JSON above for &quot;category&quot;: &quot;phoksundo&quot;. If it&apos;s missing or null, you need to run the UPDATE SQL.</li>
                </ul>
            </div>
        </div>
    );
}
