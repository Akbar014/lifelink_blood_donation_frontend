const userProfile = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token'); // Ensure token is defined here
    
    fetch(`http://127.0.0.1:8000/donate_blood/users/${user_id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const profileImage = document.getElementById('profile-image');

        if (profileImage && data.image) {
            profileImage.src = data.image; 
        }
        const user_name = localStorage.getItem("user");
        document.getElementById('userName').innerHTML = user_name;
        // document.getElementById('first_name').value = data.first_name;
        // document.getElementById('last_name').value = data.last_name;
        // document.getElementById('email').value = data.email;
        // Note: Image handling is different since it's a file input
        // document.getElementById('image').src = data.image;
        document.getElementById('mobile_no').value = data.mobile_no;
        document.getElementById('age').value = data.age;
        document.getElementById('blood_group').value = data.blood_group;
        document.getElementById('gender').value = data.gender;
        document.getElementById('address').value = data.address;
        if (data.last_donation_date) {
            document.getElementById('last_donation_date').value = new Date(data.last_donation_date).toISOString().substring(0, 10);
        }
        document.getElementById('is_available_for_donation').checked = data.is_available_for_donation;
        
        // If you want to show the profile image
        const profileImg = document.getElementById('profile-img');
        profileImg.src = data.image;
        profileImg.parentElement.href = data.image; // Add link to the image
    })
    .catch((error) => console.error('Error:', error)); // Add error handling
};

// Call the function to fetch and display profile details
userProfile();


const editProfileInfo = () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem('token');
    console.log(user_id)
    // Gather form data
    const username = document.getElementById('username').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const email = document.getElementById('email').value;
    const mobile_no = document.getElementById('mobile_no').value;
    const age = document.getElementById('age').value;
    const blood_group = document.getElementById('blood_group').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const is_available_for_donation = document.getElementById('is_available_for_donation').checked;
    console.log(is_available_for_donation)

    const profileInfo = {
        mobile_no,
        age,
        blood_group,
        gender,
        address,
        is_available_for_donation,
    };

    console.log(profileInfo);

    fetch(`https://akbar014.github.io/lifelink_blood_donation_frontend/donate_blood/users/${user_id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(profileInfo),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Profile updated:', data);
        // Optionally, redirect to another page or show a success message
    })
    .catch((error) => console.error('Error:', error));
};