function generateOTP() {
	const fpEmail = document.getElementById('fpEmail');
	const otpverify = document.getElementById('fpOTP')[0];


	let otp_val = Math.floor(Math.random() * 10000);


	let emailbody = `<h2>Your OTP is </h2>${otp_val}`;
	Email.send({
    SecureToken : "88718b38-2e2c-4a3d-8340-0421b3a23abd",
    To : email.value,
    From : "medicoplusin@gmail.com",
    Subject : "Medicoplus OTP ",
    Body : emailbody,
}).then(


	message => {
		if (message === "OK") {
			alert("OTP sent to your email " + fpEmail.value);


			otpverify.style.display = "flex";
			const otp_inp = document.getElementById('fpOTP');
			const otp_btn = document.getElementById('otp-btn');


			otp_btn.addEventListener('click', () => {
				if (fpOTP.value == otp_val) {
					alert("Email address verified...");
				}
				else {
					alert("Invalid OTP");
				}
			})
		}
	}
);
}


// -------------------------------------------------------------------------------------
        function showRegisterForm() {
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("registerForm").style.display = "block";
            document.getElementById("forgotPasswordForm").style.display = "none";
        }

        function showLoginForm() {
            document.getElementById("loginForm").style.display = "block";
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("forgotPasswordForm").style.display = "none";
        }

        function showForgotPasswordForm() {
            document.getElementById("loginForm").style.display = "none";
            document.getElementById("registerForm").style.display = "none";
            document.getElementById("forgotPasswordForm").style.display = "block";
        }

        function login() {
            const username = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;

            if (username && password) {
                alert("Login successful!");
            } else {
                alert("Please enter both username and password.");
            }
        }

        function register() {
            const username = document.getElementById("regUsername").value;
            const email = document.getElementById("regEmail").value;
            const phone = document.getElementById("regPhone").value;
            const dob = document.getElementById("regDOB").value;
            const password = document.getElementById("regPassword").value;
            const confirmPassword = document.getElementById("regConfirmPassword").value;

            if (username && email && phone && dob && password && confirmPassword) {
                if (password === confirmPassword) {
                    alert("Registration successful!");
                } else {
                    alert("Passwords do not match.");
                }
            } else {
                alert("Please fill out all fields.");
            }
        }

        function changePassword() {
            const username = document.getElementById("fpUsername").value;
            const email = document.getElementById("fpEmail").value;
            const otp = document.getElementById("fpOTP").value;
            const password = document.getElementById("fpPassword").value;
            const confirmPassword = document.getElementById("fpConfirmPassword").value;

            if (username && email && otp && password && confirmPassword) {
                if (password === confirmPassword) {
                    alert("Password changed successfully!");
                } else {
                    alert("Passwords do not match.");
                }
            } else {
                alert("Please fill out all fields.");
            }
        }
        function generateOTP() {
    const email = document.getElementById("fpEmail").value;

    if (email) {
        // Simulate OTP generation (e.g., sending to Gmail ID)
        alert(`OTP has been sent to ${email}`);
        // Simulate the OTP value (optional)
        document.getElementById("fpOTP").value = Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit OTP
    } else {
        alert("Please enter your Gmail ID to generate OTP.");
    }
}

