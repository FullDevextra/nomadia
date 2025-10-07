import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  // ✅ Handle CORS Preflight
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
      "Authorization": "Bearer re_H64cBbSz_7fiyFbGCC7BwEQKCEFY5d7Pp", // Your Resend API Key
      "Content-Type": "application/json",
    };

    // ✅ Send Congratulatory Email
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: "GlobeExtra <onboarding@resend.dev>",
        to: [applicant.email],
        subject: "🎉 Congratulations! You’ve Been Selected - GlobeExtra",
        html: `
          <h2>Dear ${applicant.first_name},</h2>
          <p>We are thrilled to inform you that you have been <strong>selected</strong> to join <strong>GlobeExtra</strong>!</p>

          <p>Our Resource Department will guide you through your onboarding process and provide you with all necessary tools and gadgets to begin your role.</p>

          <h3>📞 Resource Department Contact</h3>
          <ul>
            <li><strong>Name:</strong> John Drill</li>
            <li><strong>Phone:</strong> 09039399393</li>
            <li><strong>Email:</strong> resource@globeextra.com</li>
          </ul>

          <p>Please reach out to the department within the next <strong>48 hours</strong> to complete your onboarding process.</p>

          <br/>
          <p>Once again, congratulations and welcome to the team!</p>

          <p>Best Regards,<br/><strong>GlobeExtra HR Team</strong></p>
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
    console.error("❌ Error sending congrats email:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
});
