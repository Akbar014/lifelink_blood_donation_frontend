

const userDonationRequest = () => {
    const token = localStorage.getItem('token');
    
    console.log(token)
    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-history/`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })

    // fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-history/`)

      .then((res) => res.json())
      .then((data) => displayRequest(data))
      .catch((err) => console.log(err));
  };


  const displayRequest = (data) => {
    //   console.log(data);
    if (!data || data.length === 0) {
       
        const parent = document.getElementById("table-body");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("col-md-12", "text-center", "my-4", "text-light");
        messageDiv.innerHTML = `<p> No Donation Request accepted yet</p>`;
        parent.appendChild(messageDiv);
    }
      data.forEach(item => {
        console.log(item)
        const token = localStorage.getItem('token');
        fetch(`https://lifelink-4bu4.onrender.com/donate_blood/donation-requests/${item.donation_request}`, {
          method: 'GET', 
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
          }
      })
      .then((res) => res.json())
      .then((data) => {
        const patient_name = data.patient_name

        const parent = document.getElementById("table-body");
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td>${patient_name}</td>
            <td>${item.user}</td>
            <td>${item.status}</td>
            <td>${item.date}</td>
            
            
            ${
              data.status == "Accepted"
                ? `<td class="text-danger"> <a href="" class="text-danger" onclick="handleCancelRequest(${item.donation_request})" >Cancel Request</a> <br> <a href="" class="text-light" onclick="handleCompleteRequest(${item.donation_request})" > Donation Complete</a> </td>`
                : data.status == "Completed"
                ? `<td class="text-light">Donation Done </td>`
                : `<td ">Request Canceled</td>`
            }
       
           
            `;
        parent.appendChild(tr);
        

      })
      .catch((err) => console.log(err));


        
        
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
      })
      .catch((err) => console.log(err));
  };


  const handleCompleteRequest= (id) => {
    // event.preventDefault();
    // const donationRequestId = parseInt(event.target.getAttribute('data-id'), 10);
    const donationRequestId = id;
    console.log(typeof(donationRequestId))
    completeRequest(donationRequestId);
};

const completeRequest = (donationRequestId) => {

    const token = localStorage.getItem('token');
    
    console.log(donationRequestId)
    console.log(token)

    fetch(`https://lifelink-4bu4.onrender.com/donate_blood/complete-request/${donationRequestId}/`, {
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
      })
      .catch((err) => console.log(err));
  };



  userDonationRequest()