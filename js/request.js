const donationRequestDetails = () => {
    const param = new URLSearchParams(window.location.search).get("donorRequestId");

    fetch (`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/${param}/`)
    .then((res) => res.json())
    .then((data) =>{
        console.log(data)
        document.getElementById("patient_name").innerHTML = data.patient_name;
        document.getElementById("blood_group").innerHTML = data.blood_group;
        document.getElementById("location").innerHTML = data.location;
        document.getElementById("details").innerHTML = data.details;
        const request_date = new Date(data.requested_date);
        document.getElementById("date").innerHTML = request_date;

        const token_user = localStorage.getItem('user');

        if(data.user == token_user){
            document.getElementById("accept_request").innerHTML = "Cannot able to access own request";
        }else if(data.status == 'Accepted'){
            document.getElementById("accept_request").innerHTML = "Already accepted";
        }
        else{
            document.getElementById("accept_request").setAttribute("data-id", param);

            document.getElementById("accept_request").addEventListener('click', handleAcceptRequest);
        }
    

    })
    .catch((err) => console.log(err));
   
};

const handleAcceptRequest = (event) => {
    event.preventDefault();
    const donationRequestId = parseInt(event.target.getAttribute('data-id'), 10);
    console.log(typeof(donationRequestId))
    acceptRequest(donationRequestId);
};

const acceptRequest = (donationRequestId) => {

    const token = localStorage.getItem('token');
    
    console.log(donationRequestId)
    console.log(token)

    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/accept-request/${donationRequestId}/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
           
            
        }
    })

    // fetch(`https://lifelink-4bu4.onrender.com/donate_blood/accept-request/${donationRequestId}/`)

    .then((res) => res.json())
    .then((data) => {
    document.getElementById("accept_request").innerHTML = "Request Accepted";
    })
      .catch((err) => console.log(err));
    
      
  };



donationRequestDetails();