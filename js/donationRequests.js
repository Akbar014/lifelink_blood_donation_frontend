

const userDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    console.log(token)
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/my_requests/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })

    // fetch(`https://akbar014.github.io/lifelink_blood_donation_frontend/donate_blood/donation-history/`)

      .then((res) => res.json())
      .then((data) => displayRequest(data))
      .catch((err) => console.log(err));
  };


  const displayRequest = (data) => {
    if (!data || data.length === 0) {
        const parent = document.getElementById("table-body");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("col-md-12", "text-center", "my-4", "text-light");
        messageDiv.innerHTML = `<p> No Donation Request created yet</p>`;
        parent.appendChild(messageDiv);
    }
      data.forEach(item => {
        console.log(item)
        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.patient_name}</td>
            <td>${item.blood_group}</td>
            <td>${item.location }</td>
            <td>${item.status}</td>
            <td>${item.requested_date}</td>
            <td>
                
                <a href="topics-detail.html?donorRequestId=${item.id}" class="text-info" onclick="doantioRequestDetail(${item.id})">View</a>
                <br>
               
                
            </td>
            
       
           
            `;
        parent.appendChild(tr);
        
      });
    
  };



  const handleCancelRequest = (id) => {
    // event.preventDefault();
    // const donationRequestId = parseInt(event.target.getAttribute('data-id'), 10);
    const donationRequestId = id;
    console.log(typeof(donationRequestId))
    cancelRequest(donationRequestId);
};

const cancelRequest = (donationRequestId) => {

    const token = localStorage.getItem('token');
    
    console.log(donationRequestId)
    console.log(token)

    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/cancel-request/${donationRequestId}/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
           
            
        }
    })

    // fetch(`https://lifelink-4bu4.onrender.com/donate_blood/accept-request/${donationRequestId}/`)

      .then((res) => res.json())
      .then((data) => {
        document.getElementById("accept_request").innerHTML = "Request Canceled";
        document.getElementById("message").innerHTML = "Check Your Donation History";
      })
      .catch((err) => console.log(err));
  };


  userDonationRequest()