// responsive
// Mobile aside toggle - don't change class names
const closeBtn = document.querySelector(".logo-wrapper .close-btn");
const aside = document.querySelector("aside");

// Create hamburger if not exists
let menuBtn = document.querySelector(".menu-toggle");
if (!menuBtn) {
    menuBtn = document.createElement("div");
    menuBtn.className = "menu-toggle";
    menuBtn.innerHTML = "&#9776;";
    menuBtn.style.cssText = "position:fixed;top:1rem;right:1rem;z-index:40;font-size:1.8rem;color:var(--text-main);cursor:pointer;display:none; background: var(--card); border-radius:50%; padding: 0.2rem 0.6rem;";
    document.body.appendChild(menuBtn);
}

function checkMobile() {
    if (window.innerWidth <= 768) {
        menuBtn.style.display = "block";
    } else {
        menuBtn.style.display = "none";
        aside.classList.remove("show-aside");
    }
}
window.addEventListener("resize", checkMobile);
checkMobile();

menuBtn.addEventListener("click", () => aside.classList.add("show-aside"));
closeBtn.addEventListener("click", () => aside.classList.remove("show-aside"));
const navLinks = document.querySelectorAll(".nav-wrapper a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    aside.classList.remove("show-aside");
  });
});

closeBtn.addEventListener("click", () => {
  aside.classList.remove("show-aside");
});
// executed animation


const cheerAnimation = document.querySelector("#cheerAnimation");
const confettiContainer = document.querySelector("#confettiContainer");

function showCheerAnimation() {
    cheerAnimation.classList.add("show-cheer");
    confettiContainer.innerHTML = "";

    const colors = ["#00CFFF", "#00D084", "#FFD700", "#FF4081", "#A855F7", "#FF7A00"];

    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.6 + "s";
        confetti.style.animationDuration = (Math.random() * 1 + 2) + "s";

        const rot = Math.random() * 360;
        const xDrift = (Math.random() - 0.5) * 100;
        confetti.style.setProperty('--drift', xDrift + 'px');
        confetti.style.transform = `rotate(${rot}deg)`;

        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        cheerAnimation.classList.remove("show-cheer");
        setTimeout(() => confettiContainer.innerHTML = "", 2500);
    }, 3000);
}


// side bar nav

const navwrapper = document.querySelector(".nav-wrapper");
const navbtn = navwrapper.querySelectorAll("a");
const contents = document.querySelectorAll(".content");

navwrapper.addEventListener("click", (e) => {
    const btn = e.target.closest("a");

    if (!btn || !navwrapper.contains(btn)) return;

    const id = btn.dataset.id;

    if (!id) return;

    navbtn.forEach((link) => {
        link.classList.remove("active");
    });

    btn.classList.add("active");

    contents.forEach((content) => {
        content.classList.remove("active");
    });

    const element = document.getElementById(id);

    if (element) {
        element.classList.add("active");
    }
});


// recognizing user

const storeduser = localStorage.getItem("user");

const user = JSON.parse(storeduser);

const profilePics = document.querySelector(".pics-wrapper");
let profileName = document.querySelector(".profile-details > h3");
let profileEmail = document.querySelector(".profile-details > p");
profileName.textContent = user.fullName;
profileEmail.textContent = user.email;


// welcome user message
const welcomewrapper = document.querySelector(".welcome-msg-wrapper");
const welcomeText = document.querySelector(".welcome-msg-wrapper p");
window.addEventListener("DOMContentLoaded", () => {

    welcomewrapper.classList.add("show-msg");
    welcomeText.textContent = "Welcome back " + user.fullName;

    setTimeout(() => {
        welcomewrapper.classList.remove("show-msg");
    }, 2000);
});

const removeMsg = document.querySelector(".welcome-msg-wrapper > h3").addEventListener("click", () => {
    welcomewrapper.classList.remove("show-msg");
})



// updating user date and time
const dateUpdate = document.querySelector(".update-time");

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

const futureDate = new Date();
const currentDate = futureDate.getDate();
const currentYear = futureDate.getFullYear();
const currentHour = futureDate.getHours();
const currentMinute = futureDate.getMinutes();
const weekday = weekdays[futureDate.getDay()];
const month = months[futureDate.getMonth()];
const greeting = document.querySelector("#greeting");

const greet = futureDate.getHours();
if (greet < 12) {
    dateUpdate.textContent = `Good Morning ${user.fullName}!, Today is ${weekday}, ${month} ${currentDate} ${currentYear}, ${currentHour}:${currentMinute}`;
}
else if (greet < 17) {
    dateUpdate.textContent = `Good Afternoon ${user.fullName}!, Today is ${weekday}, ${month} ${currentDate} ${currentYear}, ${currentHour}:${currentMinute}`;
}
else {
    dateUpdate.textContent = `Good Evening ${user.fullName}! Today is ${weekday}, ${month} ${currentDate} ${currentYear}, ${currentHour}:${currentMinute}`;
}

// Adding dropping add task area

const dropTaskBtn = document.querySelector(".search-input-wrapper + button");
const addTaskArea = document.querySelector(".article");

dropTaskBtn.addEventListener("click", () => {

    if (addTaskArea.classList.contains("show-article")) {
        addTaskArea.classList.remove("show-article")
    }
    else {
        addTaskArea.classList.add("show-article");
    };


});

// Adding task

const taskName = document.querySelector("#name");
const taskDescription = document.querySelector("#description");
const addTaskBtn = document.querySelector(".add-input-container > button");
const limitDescription = document.querySelector("#description + p > span");
const allTaskContainer = document.querySelector(".main-container");
const taskNameLimit = document.querySelector(".task-name-limit > span");

taskDescription.addEventListener("input", () => {

    limitDescription.textContent = taskDescription.value.length;

    const maxlength = 200;
    if (!taskDescription.value.length === maxlength) {
        taskDescription.maxlength = maxlength;
    }
    else {
        taskDescription.maxLength = maxlength;
    }

});

taskName.addEventListener("input", () => {
    taskNameLimit.textContent = taskName.value.length;

    const limittaskname = 25;


    if (!taskName.value.length === limittaskname) {
        taskName.maxLength = limittaskname;
    }
    else {
        taskName.maxLength = limittaskname;
    }
});


document.querySelector(".idea-close-btn > p").addEventListener("click", () => {
    addTaskArea.classList.remove("show-article");
    taskDescription.value = "";
    taskName.value = "";
    limitDescription.textContent = 0;
});

const delmsg = document.querySelector(".delete-msg");
const cancel = document.querySelector(".cancel-del-wrapper > button:first-child")
const deltaskBtn = document.querySelector(".cancel-del-wrapper > button:last-child")
let selectedTask = null;
const executedtask = document.querySelector(".executed > h2");

const pendingTask = document.querySelector(".pending > h2");

const executedTaskCount = document.querySelectorAll(".executed");
const archiveTaskCount = document.querySelector(".archive");
const executedcontainer = document.querySelector(".executed-task-container");
const archivecontainer = document.querySelector(".archived-task-container");
const extaskInfo = document.querySelector(".executed-task-container + .task-info-wrapper")
const arctaskInfo = document.querySelector(".archived-task-container + .task-info-wrapper")
console.log(extaskInfo, arctaskInfo);

addTaskBtn.addEventListener("click", () => {

    if (taskName.value.trim() === "") {
        document.querySelector(".task-name-message").classList.add("show-message");
        taskName.classList.add("error");
        document.querySelector(".task-name-message").textContent = "Task name is required.";

        taskName.addEventListener("input", () => {
            if (taskName.value.trim() < 0) {
                taskName.classList.add("error");
                document.querySelector(".task-name-message").textContent = "Task name is required.";

            }
            else {
                taskName.classList.remove("error");
                document.querySelector(".task-name-message").textContent = "";
            };
        });
    }

    else if (taskDescription.value.trim() == "") {
        document.querySelector(".task-des-message").classList.add("show-message");
        taskDescription.classList.add("error");
        document.querySelector(".task-des-message").textContent = "Task description is required.";

        taskDescription.addEventListener("input", () => {



            if (taskDescription.value.trim() < 0) {
                taskDescription.classList.add("error");
                document.querySelector(".task-des-message").textContent = "Task Description is required.";

            }
            else {
                taskDescription.classList.remove("error");
                document.querySelector(".task-des-message").textContent = "";
            };


        });
    }
    else {

        if (selectedTask && isEditing) {
            selectedTask.querySelector(".task-header").textContent =
                taskName.value.trim();

            selectedTask.querySelector(".task-para").textContent =
                taskDescription.value.trim();

            taskName.value = "";
            taskDescription.value = "";

            selectedTask = null;
            isEditing = false;

            addTaskBtn.textContent = "Add Task";

            addTaskArea.classList.remove("show-article", "edit-task");
            taskinfo.classList.remove("view-task-info");

            updateTaskCount();

            return;
        }

        const eachTaskContainer = document.createElement("div");
        eachTaskContainer.className = "tasks"

        allTaskContainer.appendChild(eachTaskContainer);


        const taskHeading = document.createElement("h3");
        taskHeading.className = "task-header";
        taskHeading.textContent = taskName.value;

        const taskpara = document.createElement("p");
        taskpara.className = "task-para";
        taskpara.textContent = taskDescription.value;

        const horizontalLine = document.createElement("div");
        horizontalLine.className = "line";
        const taskDate = document.createElement("small");
        taskDate.textContent = `Task  added ${month}, ${currentDate}`
        taskDate.className = "tasks-date"
        eachTaskContainer.append(taskHeading, taskpara, horizontalLine, taskDate)

        addTaskArea.classList.remove("show-article");
        taskName.value = "";
        taskDescription.value = "";
        limitDescription.textContent = 0;
        taskNameLimit.textContent = 0;
        eachTaskContainer.classList.add("pending")
        const totltasknum = document.querySelectorAll(".totltasknum");

        function updateTaskCount() {

            totltasknum.forEach((total) => {
                total.textContent = allTaskContainer.querySelectorAll(".tasks").length + archivecontainer.children.length;
            })
        }

        function updatependingCount() {
            pendingTask.textContent =
                allTaskContainer.querySelectorAll(".pending").length + archivecontainer.querySelectorAll(".pending").length;
        }
        function updatearchiveCount() {
            archiveTaskCount.textContent =
                archivecontainer.querySelectorAll(".archive").length;
        }

        document.querySelector(".task-container-placeholder").style.display = "none";

        updateTaskCount();
        updatependingCount();

        eachTaskContainer.addEventListener("click", () => {
            selectedTask = eachTaskContainer;
            showtaskinfo();
        });


        const executed = document.querySelector(".actions-wrapper > i:last-child");
        const edit = document.querySelector(".actions-wrapper > i:nth-child(2)")
        const trash = document.querySelector(".actions-wrapper > i:first-child")
        // const exscutedTask = document.querySelector(".executed");
        const archivedtasks = document.querySelector(".actions-wrapper > i:nth-child(3)");


        // executed.addEventListener("click", () => {
        //    function exectedtask() {
        //      if (selectedTask) {
        //         const checkwrapper = document.createElement("div");
        //         checkwrapper.className = "checkwrapper";
        //         const checked = document.createElement("p");
        //         checked.className = "completed";
        //         checked.innerHTML = '<i class="bi bi-check2"> Completed ';
        //         checkwrapper.appendChild(checked)
        //         selectedTask.appendChild(checkwrapper);
        //         selectedTask.classList.remove("pending");
        //         executedcontainer.append(selectedTask);
        //         selectedTask.classList.add("executed-task");
        //         showCheerAnimation();
        //         updatependingCount();
        //         taskinfo.classList.remove("view-task-info");
        //         selectedTask.addEventListener("click", () => {
        //             tskCurstatus.textContent = "Executed";
        //             tskCurstatus.style.color = "#00CEC9";
        //         })

        //         const totalExecuted = document.querySelectorAll(".executed-task").length;

        //         executedTaskCount.forEach((completed) => {
        //             completed.textContent = totalExecuted;
        //         });

        //         selectedTask = null;
        //     }
        //    }
        //    exectedtask();

        // });


        executed.addEventListener("click", () => {
            if (!selectedTask) {
                console.log("No task has been selected");
                return;
            }

            const taskToExecute = selectedTask;

            if (!taskToExecute.querySelector(".checkwrapper")) {
                const checkwrapper = document.createElement("div");
                checkwrapper.className = "checkwrapper";

                const checked = document.createElement("p");
                checked.className = "completed";
                checked.innerHTML = '<i class="bi bi-check2"></i> Completed';

                checkwrapper.appendChild(checked);
                taskToExecute.appendChild(checkwrapper);
            }

            taskToExecute.classList.remove("pending");
            taskToExecute.classList.add("executed-task");

            executedcontainer.appendChild(taskToExecute);

            showCheerAnimation();

            updatependingCount();

            taskinfo.classList.remove("view-task-info");

            tskCurstatus.textContent = "Executed";
            tskCurstatus.style.color = "#00CEC9";

            const totalExecuted =
                executedcontainer.querySelectorAll(".executed-task").length;

            executedTaskCount.forEach((completed) => {
                completed.textContent = totalExecuted;
            });

            selectedTask = null;
        });

        archivedtasks.addEventListener("click", () => {
            taskinfo.classList.remove("view-task-info");
            welcomewrapper.classList.add("show-msg");
            welcomeText.textContent = "Task Archived";

            setTimeout(() => {
                welcomewrapper.classList.remove("show-msg");
            }, 2000);
            if (selectedTask) {
                allTaskContainer.removeChild(selectedTask);
                selectedTask.classList.add("archive");
                archivecontainer.append(selectedTask);
                taskinfo.classList.remove("view-task-info");
                updateTaskCount();
                updatependingCount();
                updatearchiveCount();
                selectedTask.addEventListener("click", () => {
                    showarchivetaskinfo();
                    tskCurstatus.textContent = "Executed";
                    tskCurstatus.style.color = "#3e1777";
                });

                selectedTask = null;
                // showing archive Task info 
                const arctaskinfo = document.querySelector(".archive-section .task-info-wrapper");
                const arcremovetaskInfo = document.querySelector(".archive-section .task-info-wrapper > p");
                const arctskCurName = document.querySelector(".archive-section .task-name-wrapper > p")
                const arctskCurdesc = document.querySelector(".archive-section .task-desc-wrapper > p");
                const arctskCurstatus = document.querySelector(".archive-section .task-status-wrapper > p")
                const arctskCurtime = document.querySelector(".archive-section .task-time-wrapper > p");

                function showarchivetaskinfo() {
                    taskinfo.classList.remove("view-task-info");
                    arctaskinfo.classList.add("view-task-info")
                    arctskCurName.textContent = taskHeading.textContent;
                    arctskCurdesc.textContent = taskpara.textContent;

                    arctskCurstatus.textContent = "Restore task to view status";
                    arctskCurstatus.style.color = "#FDCB6E";
                    arctskCurtime.textContent = tskCurtime.textContent;
                    const restorebtn = document.querySelector(".archive-actions-wrapper");
                    restorebtn.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;

                    arcremovetaskInfo.addEventListener("click", () => {
                        arctaskinfo.classList.remove("view-task-info");
                    });

                    restorebtn.addEventListener("click", () => {
                        arctaskinfo.classList.remove("view-task-info");

                        archivecontainer.removeChild(selectedTask)
                        allTaskContainer.append(selectedTask);
                        updatearchiveCount();
                        welcomewrapper.classList.add("show-msg");
                        welcomeText.textContent = "Task restored sucessful!";
                        setTimeout(() => {
                            welcomewrapper.classList.remove("show-msg");
                        }, 2000);
                        eachTaskContainer.addEventListener("click", () => {
                            showtaskinfo();
                        })
                    })

                }
                arctaskinfo.classList.remove("view-task-info");
            }




        })

        trash.addEventListener("click", () => {
            delmsg.classList.add("show-del-msg");

            deltaskBtn.addEventListener("click", () => {

                if (selectedTask) {


                    taskinfo.classList.remove("view-task-info");

                    delmsg.classList.remove("show-del-msg")
                    welcomewrapper.classList.add("show-msg");

                    selectedTask.remove();
                    selectedTask = null;
                    updateTaskCount();
                    updatependingCount();
                    welcomeText.textContent = "Task deleted successful";

                    setTimeout(() => {
                        welcomewrapper.classList.remove("show-msg");
                    }, 3000);
                }
            });

            cancel.addEventListener("click", () => {
                delmsg.classList.remove("show-del-msg");

            });

        });

        edit.addEventListener("click", () => {
            if (!selectedTask) return;

            taskName.value = selectedTask.querySelector(".task-header").textContent;
            taskDescription.value = selectedTask.querySelector(".task-para").textContent;

            isEditing = true;

            addTaskArea.classList.add("show-article");
            taskinfo.classList.remove("view-task-info");
            addTaskBtn.textContent = "Save";
        });



        // showing task info

        const taskinfo = document.querySelector(".task-info-wrapper");
        const removetaskInfo = document.querySelector(".task-info-wrapper > p");
        const tskCurName = document.querySelector(".task-name-wrapper > p")
        const tskCurdesc = document.querySelector(".task-desc-wrapper > p");
        const tskCurstatus = document.querySelector(".task-status-wrapper > p")
        const tskCurtime = document.querySelector(".task-time-wrapper > p");
        function showtaskinfo() {
            taskinfo.classList.add("view-task-info");
            tskCurName.textContent = taskHeading.textContent;
            tskCurdesc.textContent = taskpara.textContent;

            tskCurstatus.textContent = "Pending";
            tskCurstatus.style.color = "#FDCB6E";
            tskCurtime.textContent = `${weekday}, ${currentDate}  ${month}   ${currentYear}`

            removetaskInfo.addEventListener("click", () => {
                taskinfo.classList.remove("view-task-info");
            });
        }




        // const activetask = document.createElement("div");
        // activetask.className = "active-task";
        // const check = document.createElement("i");
        // check.className = "bi bi-check";
    };
});



// searching task

const search = document.querySelector("#search");

search.addEventListener("input", () => {

    const searchValue = search.value.toLowerCase().trim();
    const allTask = allTaskContainer.querySelectorAll(".tasks");

    allTask.forEach((task) => {
        const taskName = task.querySelector(".task-header").textContent.toLocaleLowerCase();
        const taskdesc = task.querySelector(".task-para").textContent.toLocaleLowerCase();

        if (taskName.includes(searchValue) || taskdesc.includes(searchValue)) {
            task.style.display = "";
        }
        else {
            task.style.display = "none";
        };
    });
});




const settingsName = document.querySelector("#settingsName");
const settingsEmail = document.querySelector("#settingsEmail");
const profilePreviewName = document.querySelector("#profilePreviewName");
const profilePreviewEmail = document.querySelector("#profilePreviewEmail");
const profileAvatar = document.querySelector("#profileAvatar");
const darkThemeToggle = document.querySelector("#darkThemeToggle");
const saveProfile = document.querySelector("#saveProfile");
const settingsFeedback = document.querySelector("#settingsFeedback");
const accentColors = document.querySelectorAll(".accent-color");
const logoutBtn = document.querySelector("#logoutBtn");

// Load saved profile
settingsName.value = localStorage.getItem("settingsName") || "";
settingsEmail.value = localStorage.getItem("settingsEmail") || "";

function updateProfilePreview() {
    const name = settingsName.value.trim() || "Your Name";
    const email = settingsEmail.value.trim() || "your@email.com";

    profilePreviewName.textContent = name;
    profilePreviewEmail.textContent = email;
    profileAvatar.textContent = name.charAt(0).toUpperCase();
}

updateProfilePreview();

settingsName.addEventListener("input", updateProfilePreview);
settingsEmail.addEventListener("input", updateProfilePreview);

// Save profile
saveProfile.addEventListener("click", () => {
    localStorage.setItem("settingsName", settingsName.value.trim());
    localStorage.setItem("settingsEmail", settingsEmail.value.trim());

    updateProfilePreview();
    settingsFeedback.textContent = "Profile saved successfully!";
});

// Load saved theme and accent color
const savedTheme = localStorage.getItem("settingsTheme");
const savedAccent = localStorage.getItem("settingsAccent") || "#6C5CE7";

function applyTheme(isDark) {
    const root = document.documentElement;

    const colors = isDark
        ? {
            "--bg": "#0a0217",
            "--card": "#10081d",
            "--card1": "#130c1f",
            "--text-main": "#FFFFFF",
            "--text-light": "#a69ab2",
            "--border": "#342840"
        }
        : {
            "--bg": "#f4f1fa",
            "--card": "#ffffff",
            "--card1": "#f8f6fc",
            "--text-main": "#241a30",
            "--text-light": "#746a80",
            "--border": "#e3dceb"
        };

    Object.entries(colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}

darkThemeToggle.checked = savedTheme !== "light";
applyTheme(darkThemeToggle.checked);

darkThemeToggle.addEventListener("change", () => {
    applyTheme(darkThemeToggle.checked);

    localStorage.setItem(
        "settingsTheme",
        darkThemeToggle.checked ? "dark" : "light"
    );
});

// Accent color selection
function applyAccent(color) {
    document.documentElement.style.setProperty("--primary", color);
    localStorage.setItem("settingsAccent", color);

    accentColors.forEach((button) => {
        button.classList.toggle("active", button.dataset.color === color);
    });
}

applyAccent(savedAccent);

accentColors.forEach((button) => {
    button.addEventListener("click", () => {
        applyAccent(button.dataset.color);
    });
});

// Log out
logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to log out?");

    if (!confirmLogout) return;

    // Change "user" to your actual authentication storage key if needed.
    localStorage.removeItem("user");

    window.location.href = "index.html";
});



















