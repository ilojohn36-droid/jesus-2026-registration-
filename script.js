const SUPABASE_URL = "https://ntaqcoquusuocqkebone.supabase.co";
const SUPABASE_KEY = "sb_publishable_eD7-93qTTDZFlzIY9OpxwQ_6F9nMwfJ";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

document.getElementById("registrationForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const institution = document.getElementById("institution").value;

    // Generate unique registration code
    const randomPart = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    const registrationCode = "CONF26-" + randomPart;
    

    // Create attendee record
    const attendee = {
        name: name,
        email: email,
        phone: phone,
        institution: institution,
        registrationCode: registrationCode,
        checkedIn: false,
        checkInTime: null
    };

    // Save attendee to Supabase
    const { data, error } = await supabaseClient
        .from("attendees")
        .insert([{
            name: name,
            email: email,
            phone: phone,
            institution: institution,
            registration_code: registrationCode,
            checked_in: false,
            check_in_time: null
        }])
        .select();

    if (error) {
        console.error("Supabase error:", error);
        alert("Registration failed. Please try again.");
        return;
    }

    // Redirect to the dedicated QR page
window.location.href =
    "registration-success.htm?code=" +
    encodeURIComponent(registrationCode);
});