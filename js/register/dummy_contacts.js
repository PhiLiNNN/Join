function dummy_obj(userName, userEMail, userPassword, userPasswordConfirm) {
  return {
    userName: userName,
    userEMail: userEMail.toLowerCase(),
    userPassword: userPassword,
    userPasswordConfirm: userPasswordConfirm,
    contacts: [
      {
        name: "Ash Ketchum",
        email: "ash@pokemon.com",
        phone: "159159159",
        colorCode: "#f94144",
        textColorCode: "white",
      },
      {
        name: "Bart Simpson",
        email: "bart@simpsons.com",
        phone: "1234567890",
        colorCode: "#f3722c",
        textColorCode: "black",
      },
      {
        name: "Bisasam",
        email: "bisasam@pokemon.com",
        phone: "2468101214",
        colorCode: "#09be6d",
        textColorCode: "white",
      },
      {
        name: "Duffman",
        email: "duffman@duff.com",
        phone: "3434343434",
        colorCode: "#277da1",
        textColorCode: "white",
      },
      {
        name: "Eichhörnchen Scrat",
        email: "scrat@iceage.com",
        phone: "4242424242",
        colorCode: "#f9c74f",
        textColorCode: "black",
      },
      {
        name: "Eric Cartman",
        email: "cartman@southpark.com",
        phone: "0303030303",
        colorCode: "#577590",
        textColorCode: "white",
      },
      {
        name: "Faultier Sid",
        email: "sid@iceage.com",
        phone: "6767676767",
        colorCode: "#43aa8b",
        textColorCode: "black",
      },
      {
        name: "Glumanda",
        email: "glumanda@pokemon.com",
        phone: "9876543210",
        colorCode: "#ff4500",
        textColorCode: "white",
      },
      {
        name: "Helloworld",
        email: "planet@vegetacom",
        phone: "01751234658",
        colorCode: "#43da86",
        textColorCode: "black",
      },
      {
        name: "Homer Simpson",
        email: "homer@springfield.com",
        phone: "1234567890",
        colorCode: "#d0d256",
        textColorCode: "black",
      },
      {
        name: "Kakarott",
        email: "planet@vegeta.com",
        phone: "01751234658",
        colorCode: "#82e1f2",
        textColorCode: "black",
      },
      {
        name: "Kenny Mccormick",
        email: "kenny@southpark.com",
        phone: "3692581470",
        colorCode: "#4d908e",
        textColorCode: "white",
      },
      {
        name: "Mammut Manny",
        email: "manny@iceage.com",
        phone: "9876543210",
        colorCode: "#bb3e03",
        textColorCode: "white",
      },
      {
        name: "Max",
        email: "max.katze@bluewin.ch",
        phone: "0041796545860",
        colorCode: "#daa344",
        textColorCode: "black",
      },
      {
        name: "Mr Burns",
        email: "mr.burns@springfield.com",
        phone: "5757575757",
        colorCode: "#0a9396",
        textColorCode: "white",
      },
      {
        name: "Patrick Star",
        email: "patrick@spongebob.com",
        phone: "987987987",
        colorCode: "#8fda44",
        textColorCode: "black",
      },
      {
        name: "Philipp Wendschuch",
        email: "phndschuch@web.de",
        phone: "017367593",
        colorCode: "#43da86",
        textColorCode: "black",
      },
      {
        name: "Pika Pikachu",
        email: "pikachu@pokemon.com",
        phone: "5757575757",
        colorCode: "#f1d627",
        textColorCode: "black",
      },
      {
        name: "Son Goku",
        email: "goku@dbz.com",
        phone: "8989898989",
        colorCode: "#ff0066",
        textColorCode: "white",
      },
      {
        name: "Spongebob Schwammkopf",
        email: "spongebob@spongebob.com",
        phone: "1234567890",
        colorCode: "#c6d747",
        textColorCode: "black",
      },
      {
        name: "Stan Marsh",
        email: "stan@southpark.com",
        phone: "9876543210",
        colorCode: "#4462da",
        textColorCode: "white",
      },
      {
        name: "Vegeta",
        email: "vegeta@dbz.com",
        phone: "9876543210",
        colorCode: "#005f73",
        textColorCode: "white",
      },
      {
        name: "Silas Voss",
        email: "Silas@voss.com",
        phone: "1525664356",
        colorCode: "#43da86",
        textColorCode: "black",
      },
    ],
    tasks: {
      titles: [
        "Implement User Authentication",
        "Create Task Dashboard",
        "Set Up Database Schema",
        "Build Task Creation Form",
        "Implement Subtask Functionality",
        "User Profile Management",
        "Notification System",
        "Implement Search Functionality",
        "Fix Login Issue on Mobile Devices",
        "Create API Documentation",
      ],
      descriptions: [
        "Set up user login and registration functionality.",
        "Develop a dashboard to display all tasks.",
        "Design and implement the database schema for the application.",
        "Develop a form for creating new tasks.",
        "Allow users to create and manage subtasks.",
        "Develop features for users to manage their profiles.",
        "Set up a system to notify users about task updates.",
        "Allow users to search for tasks.",
        "Resolve issues with user login on mobile devices.",
        "Write comprehensive documentation for the application's API.",
      ],
      assignedTo: [
        {
          colorCodes: [
            "rgb(249, 65, 68)",
            "rgb(9, 190, 109)",
            "rgb(255, 69, 0)",
            "rgb(241, 214, 39)",
          ],
          initials: ["AK", "B", "G", "PP"],
          textColors: [
            "rgb(255, 255, 255)",
            "rgb(255, 255, 255)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
          ],
          userMails: [
            "ash@pokemon.com",
            "bisasam@pokemon.com",
            "glumanda@pokemon.com",
            "pikachu@pokemon.com",
          ],
          userNames: ["Ash Ketchum", "Bisasam", "Glumanda", "Pika Pikachu"],
        },
        {
          colorCodes: [
            "rgb(39, 125, 161)",
            "rgb(208, 210, 86)",
            "rgb(249, 65, 68)",
            "rgb(243, 114, 44)",
          ],
          initials: ["D", "HS", "AK", "BS"],
          textColors: ["rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(0, 0, 0)"],
          userMails: [
            "duffman@duff.com",
            "homer@springfield.com",
            "ash@pokemon.com",
            "bart@simpsons.com",
          ],
          userNames: ["Duffman", "Homer Simpson", "Ash Ketchum", "Bart Simpson"],
        },
        {
          colorCodes: ["rgb(87, 117, 144)", "rgb(68, 98, 218)"],
          initials: ["EC", "SM"],
          textColors: ["rgb(255, 255, 255)", "rgb(255, 255, 255)"],
          userMails: ["cartman@southpark.com", "stan@southpark.com"],
          userNames: ["Eric Cartman", "Stan Marsh"],
        },
        {
          colorCodes: ["rgb(249, 65, 68)", "rgb(68, 98, 218)", "rgb(243, 114, 44)"],
          initials: ["AK", "SM", "BS"],
          textColors: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)"],
          userMails: ["cartman@southpark.com", "stan@southpark.com", "bart@simpsons.com"],
          userNames: ["Eric Cartman", "Stan Marsh", "Bart Simpson"],
        },
        {
          colorCodes: ["rgb(249, 65, 68)", "rgb(68, 98, 218)", "rgb(243, 114, 44)"],
          initials: ["AK", "SM", "BS"],
          textColors: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)"],
          userMails: ["cartman@southpark.com", "stan@southpark.com", "bart@simpsons.com"],
          userNames: ["Eric Cartman", "Stan Marsh", "Bart Simpson"],
        },
        {
          colorCodes: ["rgb(249, 65, 68)", "rgb(68, 98, 218)", "rgb(243, 114, 44)"],
          initials: ["AK", "V", "BS"],
          textColors: ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)"],
          userMails: ["cartman@southpark.com", "vegeta@dbz.com", "bart@simpsons.com"],
          userNames: ["Eric Cartman", "Vegeta", "Bart Simpson"],
        },
        {
          colorCodes: [
            "rgb(249, 65, 68)",
            "rgb(243, 114, 44)",
            "rgb(9, 190, 109)",
            "rgb(39, 125, 161)",
            "rgb(249, 199, 79)",
            "rgb(87, 117, 144)",
            "rgb(67, 170, 139)",
            "rgb(255, 69, 0)",
            "rgb(208, 210, 86)",
            "rgb(77, 144, 142)",
            "rgb(187, 62, 3)",
            "rgb(218, 163, 68)",
            "rgb(10, 147, 150)",
            "rgb(143, 218, 68)",
            "rgb(241, 214, 39)",
            "rgb(255, 0, 102)",
            "rgb(198, 215, 71)",
            "rgb(68, 98, 218)",
            "rgb(0, 95, 115)",
          ],
          initials: [
            "AK",
            "BS",
            "B",
            "D",
            "ES",
            "EC",
            "FS",
            "G",
            "HS",
            "KM",
            "MM",
            "M",
            "MB",
            "PS",
            "PP",
            "SG",
            "SS",
            "SM",
            "V",
          ],
          textColors: [
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(0, 0, 0)",
            "rgb(255, 255, 255)",
            "rgb(255, 255, 255)",
          ],
          userMails: [
            "ash@pokemon.com",
            "bart@simpsons.com",
            "bisasam@pokemon.com",
            "duffman@duff.com",
            "scrat@iceage.com",
            "cartman@southpark.com",
            "sid@iceage.com",
            "glumanda@pokemon.com",
            "homer@springfield.com",
            "kenny@southpark.com",
            "manny@iceage.com",
            "max.katze@bluewin.ch",
            "mr.burns@springfield.com",
            "patrick@spongebob.com",
            "pikachu@pokemon.com",
            "goku@dbz.com",
            "spongebob@spongebob.com",
            "stan@southpark.com",
            "vegeta@dbz.com",
          ],
          userNames: [
            "Ash Ketchum",
            "Bart Simpson",
            "Bisasam",
            "Duffman",
            "Eichhörnchen Scrat",
            "Eric Cartman",
            "Faultier Sid",
            "Glumanda",
            "Homer Simpson",
            "Kenny Mccormick",
            "Mammut Manny",
            "Max",
            "Mr Burns",
            "Patrick Star",
            "Pika Pikachu",
            "Son Goku",
            "Spongebob Schwammkopf",
            "Stan Marsh",
            "Vegeta",
          ],
        },
        {
          colorCodes: ["rgb(143, 218, 68)", "rgb(198, 215, 71)"],
          initials: ["PS", "SS"],
          textColors: ["rgb(0, 0, 0)", "rgb(0, 0, 0)"],
          userMails: ["patrick@spongebob.com", "spongebob@spongebob.com"],
          userNames: ["Patrick Star", "Spongebob Schwammkopf"],
        },
        {
          colorCodes: ["rgb(243, 114, 44)", "rgb(208, 210, 86)"],
          initials: ["BS", "HS"],
          textColors: ["rgb(0, 0, 0)", "rgb(0, 0, 0)"],
          userMails: ["bart@simpsons.com", "homer@springfield.com"],
          userNames: ["Bart Simpson", "Homer Simpson"],
        },
        {
          colorCodes: ["rgb(249, 199, 79)", "rgb(67, 170, 139)", "rgb(187, 62, 3)"],
          initials: ["ES", "FS", "MM"],
          textColors: ["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(255, 255, 255)"],
          userMails: ["scrat@iceage.com", "sid@iceage.com", "manny@iceage.com"],
          userNames: ["Eichhörnchen Scrat", "Faultier Sid", "Mammut Manny"],
        },
      ],
      prios: ["urgent", "low", "urgent", "low", "medium", "low", "medium", "low", "urgent", "low"],
      categories: [
        "Technical Task",
        "Feature Request",
        "Infrastructure",
        "User Story",
        "Enhancement",
        "Feature Request",
        "Technical Task",
        "Feature Request",
        "Bug",
        "Documentation",
      ],
      subtasks: [
        {
          done: [true, true, false, false, true],
          tasks: [
            "Design login and registration forms.",
            "Implement backend for user authentication.",
            "Add validation for input fields..",
            "Set up session management.",
          ],
        },
        {
          done: [false, false, false],
          tasks: [
            "Design the dashboard UI.",
            "Fetch tasks from the database.",
            "Implement filtering and sorting of tasks.",
          ],
        },
        {
          done: [true, false],
          tasks: [
            "Define tables and relationships.",
            "Implement migrations for schema changes.",
            "Implement filtering and sorting of tasks.",
          ],
        },
        {done: [true, false], tasks: ["Implement form validation.", "Handle form submission."]},
        {
          done: [true, true],
          tasks: [
            "Implement backend logic for subtasks.",
            "Add functionality to link subtasks to main tasks.",
          ],
        },
        {
          done: [true, true, false, false],
          tasks: [
            "Design profile management UI.",
            "Implement profile update functionality.",
            "Add password change option.",
            "Handle profile picture upload.",
          ],
        },
        {
          done: [false, false],
          tasks: ["Implement backend for notifications.!", "Add real-time notification support."],
        },
        {
          done: [false],
          tasks: ["Implement search algorithm."],
        },
        {
          done: [false, false, false],
          tasks: [
            "Identify the root cause of the login issue.",
            "Implement the fix for the problem.",
            "Test the fix on various mobile devices.",
          ],
        },
        {
          done: [true, true],
          tasks: ["List all available API endpoints.", "Document request and response formats."],
        },
      ],
      dates: [
        "2024-07-26",
        "2024-07-21",
        "2024-07-24",
        "2024-07-01",
        "2024-08-16",
        "2024-08-13",
        "2024-07-22",
        "2024-07-12",
        "2024-06-09",
        "2024-07-28",
      ],
      board: [
        "toDo",
        "toDo",
        "toDo",
        "inProgress",
        "done",
        "inProgress",
        "awaitFeedback",
        "awaitFeedback",
        "awaitFeedback",
        "done",
      ],
    },
  };
}
