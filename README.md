# Wild Payments

[Live demo](https://wildpayments.vercel.app/)

| Username               | Password |
| ---------------------- | -------- |
| admin@wildpayments.com | test     |
| user@wildpayments.com  | test     |

## Approach

I chose a monolithic architecture using Next.js, Chakra as the UI library, PostgreSQL as the relational database, and Prisma as the ORM. For authentication and authorization, I utilized NextAuth. I adopted this approach to achieve simplicity and rapid development.

### Next.js

I chose Next.js because it offers simplicity and provides a unified development environment with a single codebase, making it efficient for rapid development. Additionally, Next.js excels in handling navigation, routing, and API routes. Its integrated routing system simplifies navigation, eliminating the need for extra libraries. Furthermore, I was able to define API routes within my application, which proved to be a significant time-saver.

### PostgreSQL

I chose PostgreSQL for my payment application because of its crucial role in ensuring the integrity, scalability, and consistency required for financial transactions. The database's ACID compliance adds an extra layer of reliability, making it a secure and robust choice for handling sensitive financial data.

### Prisma

I chose Prisma for its seamless integration with Next.js, simplicity, and intuitive syntax.

### NextAuth

As you may have noticed, my primary considerations centered around simplicity and rapid development. This is why I chose NextAuth for authentication, given its seamless integration with Next.js.

### Better alternative

While my choice of a monolithic architecture prioritized simplicity and rapid development, a microservices architecture could have offered benefits in terms of scalability, maintainability, and flexibility. In an alternative approach, I could have chosen a microservices architecture for the payment application. This strategy could involve developing two main components – Customer Information Management and Payment Management – designed to be isolated and independently scalable. These microservices would communicate with a Single-Page Application (SPA) through an API Gateway.

## Scalability and failure tolerance

Choosing a monolithic architecture means that the components are closely linked, making it difficult to scale specific features and handle failures. The challenge in scaling comes from these tight connections, and if one part fails, it can affect the entire system. Identifying issues during failures becomes difficult, posing a challenge to the overall reliability of the application.

While addressing scaling challenges, the monolithic architecture often relies on vertical scaling, achieved by upgrading server resources (CPU, RAM) as needed. However, it's important to note that vertical scaling has its limits, becoming less efficient and cost-effective for sustained, long-term growth.

### Better alternative

Had I chosen a microservices architecture, scaling specific features and handling failures would have been more seamless. Microservices excel in scalability and failure tolerance due to their decentralized nature. Each microservice operates independently, allowing for easy horizontal scaling by adding more instances. Failures in one microservice typically don't spread to the entire system, enhancing overall resilience.
