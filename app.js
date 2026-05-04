 // ── Helper: get initials from a full name ──
    function getInitials(name) {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }

    // ── Build one card column ──
    function createCard(user, index) {
      const col = document.createElement('div');
      col.className = 'col';
      // Stagger the animation delay
      col.style.animationDelay = `${index * 60}ms`;

      col.innerHTML = `
        <div class="user-card">
          <div class="avatar">${getInitials(user.name)}</div>
          <div class="card-name">${user.name}</div>
          <div class="card-username">${user.username}</div>
          <hr class="divider"/>
          <div class="card-email">
            ✉ <a href="mailto:${user.email}">${user.email}</a>
          </div>
        </div>
      `;

      return col;
    }

    // ── Main: fetch users and render cards ──
    async function loadUsers() {
      const statusEl  = document.getElementById('status');
      const gridEl    = document.getElementById('card-grid');

      try {
        // 1. Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // 2. Check if the request succeeded
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 3. Parse JSON
        const users = await response.json();

        // 4. Hide loading message
        statusEl.style.display = 'none';

        // 5. Loop through users and add a card for each
        users.forEach((user, index) => {
          const card = createCard(user, index);
          gridEl.appendChild(card);
        });

      } catch (error) {
        // Show error message if something went wrong
        statusEl.innerHTML = `
          <p style="color:#e76f51; font-size:1.1rem;">
            ⚠️ Could not load users.<br>
            <small style="color:#666">${error.message}</small>
          </p>
        `;
      }
    }

    // Run when page loads
    loadUsers();
  