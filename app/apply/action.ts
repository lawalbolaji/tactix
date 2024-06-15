"use server";

export async function submitJobApplication(formData: FormData) {
    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        resume: formData.get("resume"),
        coverLetter: formData.get("cover-letter"),
        additional: formData.get("additional"),
    };

    console.log(payload);

    // redirect();
}
