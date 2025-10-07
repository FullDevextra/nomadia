import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // ✅ Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    const { applicant } = await req.json();

    const headers = {
      "Authorization": "Bearer re_H64cBbSz_7fiyFbGCC7BwEQKCEFY5d7Pp", // Replace with your Resend key
      "Content-Type": "application/json",
    };

    // ✅ Send Email
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: "GlobeExtra <onboarding@resend.dev>",
        to: [applicant.email],
        subject: "🎯 Next Step: Complete Your Profile - GlobeExtra Recruitment",
        html: `
          <h2>Dear ${applicant.first_name},</h2>
          <p>Congratulations! 🎉 You have been shortlisted for the next phase of our recruitment process.</p>
          <p>To continue, please set up your full profile using the link below:</p>
          <p>
            <a href="https://globeextra.com/profile-setup" target="_blank"
            style="background-color:#2563eb; color:#fff; padding:10px 15px; text-decoration:none; border-radius:5px;">
            Complete Profile Setup
            </a>
          </p>
          <p>Please ensure your details are accurate. Our HR team will review your profile once completed.</p>
          <br/>
          <p>Best Regards,<br/>GlobeExtra HR Team</p>
        `,
      }),
    });

    const emailResponse = await emailRes.json();

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("❌ Error sending shortlist email:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
});
