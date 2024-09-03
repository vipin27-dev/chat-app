document.getElementById('create-group-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const groupName = document.getElementById('group-name').value;
    const inviteUsers = document.getElementById('invite-users').value.split(',').map(email => email.trim());

    try {
        const response = await axios.post('/api/groups', {
            name: groupName,
            inviteUsers,
            userId: localStorage.getItem('userId')
        });

        if (response.data.success) {
            document.getElementById('message').innerText = 'Group created successfully!';
            document.getElementById('message').style.color = '#28a745';
            setTimeout(() => window.location.href = '/chat', 2000);
        } else {
            document.getElementById('message').innerText = response.data.message;
        }
    } catch (error) {
        document.getElementById('message').innerText = 'An error occurred while creating the group.';
        console.error('Error creating group:', error);
    }
});
