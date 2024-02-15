Nutrition Care Process (NCP) is a systematic method used by nutrition professionals to assess, diagnose, treat, and monitor patients. 

# CLoe: Digital workflow to streamline the Nutrition Care Process

## Empowering Personalized Nutrition and Building Community

Cloe transcends software; it's a movement in the digital nutrition care process, nurtured by community collaboration. Founded in 2020 through the partnership between BeHealth Nutrition Center and Olive Harmony, now it has to blossom into a public platform serving individuals worldwide.

Imagine nutrition professionals seamlessly assessing, diagnosing, and monitoring patients with features like meal planning, goal tracking, and custom nutrition plans. This approach unlocks better health outcomes and empowers individuals to take charge of their well-being.

## Community at the Core

Olive Harmony's mission extends beyond software development. We envision a community of peace and leadership, nurturing education and skill development for young generations. By joining CLoe's open-source journey, you contribute to:

- **Fixing bugs and enhancing features:** Share your expertise and elevate the platform's stability and usefulness.
- **Adding new features:** Shape CLoe's future by proposing and developing functionalities that address real-world needs.
- **Expanding market reach:** Help connect CLoe to a wider range of food and nutrition professionals, enriching its impact.

## Developing Tomorrow's Leaders

Collaborating on Cloe presents invaluable skill-building opportunities:

- **Technical skills:** Master programming languages, frontend and backend development, quality assurance, and UI/UX design.
- **Soft skills:** Hone your business development, market research, public speaking, and teamwork abilities.
- **Boost your career prospects** Increase your visibility to industry leaders, and build a portfolio you're truly proud of that demonstrates your skills and growth.

##  Join the Movement

Visit the [Olive Harmony website](https://www.oliveharmony.org) to learn more about our mission, existing projects, and membership.

Together, let's build a platform that empowers individuals, fosters community, and fuels positive change in the world of nutrition.

 

## Installation guide for running CLoe locally

To begin, clone the public repository, which currently includes the web server located in the `./api` folder and the web application in the `./app` folder.

### API Setup:

1. **Ensure you have the .NET 8.0 SDK installed.**
   - [Download .NET 8.0](https://dotnet.microsoft.com/download)

2. **Install Microsoft SQL Server 2022 Express.**
   - [SQL Server 2022 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

3. **Navigate to the `./api` directory.**
   ```bash
   cd ./api
   ```

4. **Run any necessary database migrations setup scripts.**
   - We're using Entity Framework Core for migrations, run the following command:
     ```bash
     cd ./api/BeHealth.API/
     dotnet ef database update
     ```

  5. **Start the API server.**
   - Run the following command to build and run the API server:
     ```bash
     dotnet run
     ```
   - This command will compile the API project and start the server.

**Accessing Swagger UI:**
- Once the API server is running, you can access the Swagger UI, which provides interactive documentation for CLoe API endpoints.
- Navigate to the following URL in your web browser:
  ```
  http://localhost:5000/swagger
  ```


### App Setup:

1. **Ensure you have Node.js 14.**
   - [Download Node.js](https://nodejs.org/)


2. **Install dependencies.**
   ```bash
   npm install
   ```


3. **Navigate to the `./app` directory.**
   ```bash
   cd ./app
   ```

4. **Install local Angular CLI 11 using npm.**
   ```bash
   npm install @angular/cli@11.2.1
   ```   

5. **Start the application.**
   ```bash
   ng serve
   ```

This command will compile the application and start a development server. Once started, you can access the application in your web browser at `http://localhost:4200`.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

