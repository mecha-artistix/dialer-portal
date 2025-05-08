This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Login to MariaDB:

bash
Copy
Edit
sudo mysql
Then run:

sql
Copy
Edit
CREATE USER 'dev_user'@'%' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON asterisk.\* TO 'dev_user'@'%';
FLUSH PRIVILEGES;
✅ 2. Update MariaDB config to allow remote connections
Edit config file:

bash
Copy
Edit
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
Find:

ini
Copy
Edit
bind-address = 127.0.0.1
Change to:

ini
Copy
Edit
bind-address = 0.0.0.0
Restart service:

bash
Copy
Edit
sudo systemctl restart mariadb
✅ 3. Allow port 3306 in firewall
If using UFW:

bash
Copy
Edit
sudo ufw allow 3306/tcp

4.  Test connection from remote machine
    bash
    Copy
    Edit
    mysql -h your_server_ip -u dev_user -p

**run commands to prune dangling images and run the image**
docker images
docker container prune -f
docker rmi ad07d907c502 c4c2f8ebddfe 39e5a44ce4dd 87b402c98a76 011d9e48507c de9c41d7b564
git pull origin next-js
docker build -t dialerportal:latest .
docker run -p 9898:9898 dialerportal
docker run -v $(pwd)/src:/app/src -p 9898:9898 dialerportal
