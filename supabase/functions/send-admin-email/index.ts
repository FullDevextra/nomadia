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

    // ✅ Setup shared headers
    const headers = {
      "Authorization": "Bearer re_H64cBbSz_7fiyFbGCC7BwEQKCEFY5d7Pp", // 🔐 Your Resend API key
      "Content-Type": "application/json",
    };

    // ✅ 1. Send Admin Notification Email
    const adminEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: "GlobeExtra Recruitment <recruitment@globeextra.com>",
        // from: "GlobeExtra  <onboarding@resend.dev>", ✅ Verified sender
        to: ["ml1357665@gmail.com"], // ✅ Admin email
        subject: "🎉 New Job Application Received!",
        html: `
          <h2>📬 New Application Received</h2>
          <p><b>Name:</b> ${applicant.first_name} ${applicant.last_name}</p>
          <p><b>Email:</b> ${applicant.email}</p>
          <p><b>Phone:</b> ${applicant.phone}</p>
          <p><b>Position:</b> ${applicant.position || "N/A"}</p>
          <p><b>SSN:</b> ${applicant.ssn || "N/A"}</p>
          <p><b>Resume:</b> ${
            applicant.resume_url
              ? `<a href="${applicant.resume_url}" target="_blank">View Resume</a>`
              : "Not Provided"
          }</p>
          <p><b>ID Card:</b> ${
            applicant.id_card_url
              ? `<a href="${applicant.id_card_url}" target="_blank">View ID</a>`
              : "Not Provided"
          }</p>
          <hr/>
          <p>Login to your admin dashboard to review more details.</p>
        `,
      }),
    });

    const adminResponse = await adminEmail.json();

    // ✅ 2. Send Applicant Confirmation Email
    const applicantEmail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: "GlobeExtra Recruitment <recruitment@globeextra.com>",
        to: [applicant.email],
        subject: "✅ Application Received - GlobeExtra Work",
        html: `
          <h2>Hi ${applicant.first_name},</h2>
          <p>We’ve received your application for the <strong>${applicant.position}</strong> role.</p>
          <p>Our recruitment team will review your submission and get back to you within <strong>48 hours</strong>.</p>
          <br/>
          <p>Thank you for your interest in joining GlobeExtra!</p>
          <br/>
          <p>Best Regards,<br/>GlobeExtra Team</p>
        `,
      }),
    });

    const applicantResponse = await applicantEmail.json();

    console.log("📬 Admin Response:", adminResponse);
    console.log("📨 Applicant Response:", applicantResponse);

    // ✅ Final response
    return new Response(
      JSON.stringify({ success: true, adminResponse, applicantResponse }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
