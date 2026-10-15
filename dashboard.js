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

document.querySelector(".done").addEventListener("click", showCheerAnimation)

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

let profileName = document.querySelector(".profile-details > h3");
let profileEmail = document.querySelector(".profile-details > p");

profileName.textContent = user.fullName || "YourName";
profileEmail.textContent = user.email || "youremail@gmail.com";


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

        eachTaskContainer.dataset.createdAt = new Date().toISOString();

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
                total.textContent = allTaskContainer.querySelectorAll(".tasks").length + archivecontainer.querySelectorAll(".archive").length + executedcontainer.querySelectorAll(".executed-task").length;
            })
        }

        function completedTask() {
            const totalExecuted =
                executedcontainer.querySelectorAll(".executed-task").length;
            executedTaskCount.forEach((completed) => {
                completed.textContent = totalExecuted;
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


        const executed = document.querySelector(".actions-wrapper > i:first-child");
        const edit = document.querySelector(".actions-wrapper > i:nth-child(2)")
        const trash = document.querySelector(".actions-wrapper > i:last-child")
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


        // executed.addEventListener("click", () => {
        //     if (!selectedTask) {

        //         return;
        //     }

        //     const taskToExecute = selectedTask;

        //     if (!taskToExecute.querySelector(".checkwrapper")) {
        //         const checkwrapper = document.createElement("div");
        //         checkwrapper.className = "checkwrapper";

        //         const checked = document.createElement("p");
        //         checked.className = "completed";
        //         checked.innerHTML = '<i class="bi bi-check2"></i> Completed';

        //         checkwrapper.appendChild(checked);
        //         taskToExecute.appendChild(checkwrapper);
        //         taskToExecute.classList.remove("pending");
        //         taskToExecute.classList.add("executed-task");
        //         const removetskplaceolder = document.querySelector(".executed-section .task-info-wrapper + p").style.display = "none";
        //         executedcontainer.appendChild(taskToExecute);

        //         showCheerAnimation();

        //         updatependingCount();

        //         taskinfo.classList.remove("view-task-info");

        //         tskCurstatus.textContent = "Executed";
        //         tskCurstatus.style.color = "#00CEC9";
        //         completedTask();
        //         selectedTask.addEventListener("click", () => {
        //             showExecutedtaskinfo();
        //             tskCurstatus.textContent = "Executed";
        //             tskCurstatus.style.color = "#3e1777";

        //             eachTaskContainer.addEventListener("click", () => {
        //                 arctaskInfo.classList.remove("view-task-info");
        //                 extaskInfo.classList.remove("view-task-info")
        //                 taskinfo.classList.add("view-task-info")


        //             })
        //         });

        //         const exttaskinfo = document.querySelector(".executed-section .task-info-wrapper");
        //         const extremovetaskInfo = document.querySelector(".executed-section .task-info-wrapper > p");
        //         const exttskCurName = document.querySelector(".executed-section .task-name-wrapper > p")
        //         const exttskCurdesc = document.querySelector(".executed-section .task-desc-wrapper > p");
        //         const exttskCurstatus = document.querySelector(".executed-section .task-status-wrapper > p")
        //         const exttskCurtime = document.querySelector(".executed-section .task-time-wrapper > p");

        //         function showExecutedtaskinfo() {
        //             taskinfo.classList.remove("view-task-info");
        //             exttaskinfo.classList.add("view-task-info");
        //             exttskCurName.textContent = taskHeading.textContent;
        //             exttskCurdesc.textContent = taskpara.textContent;
        //             exttskCurstatus.textContent = "Executed";
        //             exttskCurstatus.style.color = "#22D3EE";
        //             exttskCurtime.textContent = tskCurtime.textContent;

        //             extremovetaskInfo.
        //                 addEventListener("click", () => {
        //                     exttaskinfo.classList.remove("view-task-info");
        //                 });
        //             const undobtn = document.querySelector(".executed-section .actions-wrapper");

        //             const icon = document.createElement("i");
        //             icon.className = "bi-arrow-counterclockwise";
        //             undobtn.replaceChildren(icon)

        //             icon.addEventListener("click", () => {
        //                 taskToExecute.removeChild(checkwrapper);
        //                 taskToExecute.classList.add("pending");
        //                 taskToExecute.classList.remove("executed-task");

        //                 exttaskinfo.classList.remove("view-task-info");
        //                 allTaskContainer.appendChild(taskToExecute)
        //                 taskToExecute.classList.remove("executed-task");

        //                 taskinfo.classList.remove("view-task-info");

        //                 completedTask();
        //                 updatependingCount();

        //                 selectedTask = null;
        //             })

        //             allTaskContainer.append(selectedTask);
        //             updatearchiveCount();

        //             welcomewrapper.classList.add("show-msg");
        //             welcomeText.textContent = "Task undone";
        //             setTimeout(() => {
        //                 welcomewrapper.classList.remove("show-msg");
        //             }, 2000);
        //             eachTaskContainer.addEventListener("click", () => {
        //                 showtaskinfo();
        //             })

        //             selectedTask = null;
        //         }

        //     }
        //     selectedTask = null;
        // });


        const exttaskinfo = document.querySelector(
            ".executed-section .task-info-wrapper"
        );
        const extremovetaskInfo = document.querySelector(
            ".executed-section .task-info-wrapper > p"
        );
        const exttskCurName = document.querySelector(
            ".executed-section .task-name-wrapper > p"
        );
        const exttskCurdesc = document.querySelector(
            ".executed-section .task-desc-wrapper > p"
        );
        const exttskCurstatus = document.querySelector(
            ".executed-section .task-status-wrapper > p"
        );
        const exttskCurtime = document.querySelector(
            ".executed-section .task-time-wrapper > p"
        );
        const undobtn = document.querySelector(
            ".executed-section .actions-wrapper"
        );

        function showExecutedtaskinfo(task) {
            selectedTask = task;

            taskinfo.classList.remove("view-task-info");
            exttaskinfo.classList.add("view-task-info");

            exttskCurName.textContent =
                task.querySelector(".task-header").textContent;

            exttskCurdesc.textContent =
                task.querySelector(".task-para").textContent;

            exttskCurstatus.textContent = "Executed";
            exttskCurstatus.style.color = "#22D3EE";

            const taskTime = task.querySelector(".task-time");

            exttskCurtime.textContent = taskTime
                ? taskTime.textContent
                : "";

            const undoIcon = document.createElement("i");
            undoIcon.className = "bi bi-arrow-counterclockwise";

            undobtn.replaceChildren(undoIcon);
        }

        executed.addEventListener("click", () => {
            if (!selectedTask) return;

            const taskToExecute = selectedTask;

            if (taskToExecute.classList.contains("executed-task")) {
                return;
            }

            const checkwrapper = document.createElement("div");
            checkwrapper.className = "checkwrapper";

            const checked = document.createElement("p");
            checked.className = "completed";
            checked.innerHTML = '<i class="bi bi-check2"></i> Completed';

            checkwrapper.appendChild(checked);
            taskToExecute.appendChild(checkwrapper);

            taskToExecute.classList.remove("pending");
            taskToExecute.classList.add("executed-task");

            executedcontainer.appendChild(taskToExecute);

            showCheerAnimation();

            taskinfo.classList.remove("view-task-info");

            completedTask();
            updatependingCount();

            selectedTask = null;
        });

        executedcontainer.addEventListener("click", (event) => {
            const task = event.target.closest(".executed-task");

            if (!task || !executedcontainer.contains(task)) return;

            showExecutedtaskinfo(task);
        });

        extremovetaskInfo.addEventListener("click", () => {
            exttaskinfo.classList.remove("view-task-info");
        });

        undobtn.addEventListener("click", () => {
            if (!selectedTask) return;

            const taskToUndo = selectedTask;
            const checkwrapper = taskToUndo.querySelector(".checkwrapper");

            if (checkwrapper) {
                checkwrapper.remove();
            }

            taskToUndo.classList.remove("executed-task");
            taskToUndo.classList.add("pending");

            allTaskContainer.appendChild(taskToUndo);

            exttaskinfo.classList.remove("view-task-info");

            completedTask();
            updatependingCount();

            selectedTask = null;

            welcomewrapper.classList.add("show-msg");
            welcomeText.textContent = "Task undone";

            setTimeout(() => {
                welcomewrapper.classList.remove("show-msg");
            }, 2000);
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
                selectedTask.classList.add("archive"); const removetskplaceolder = document.querySelector(".archive-section .task-info-wrapper + p").style.display = "none";
                archivecontainer.append(selectedTask);
                taskinfo.classList.remove("view-task-info");
                updatependingCount();
                updatearchiveCount();
                updateTaskCount();
                selectedTask.addEventListener("click", () => {
                    showarchivetaskinfo();
                });

                selectedTask = null;

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

                    const icon = document.createElement("i");
                    icon.className = "bi-arrow-counterclockwise";
                    restorebtn.replaceChildren(icon)

                    arcremovetaskInfo.addEventListener("click", () => {
                        arctaskinfo.classList.remove("view-task-info");
                    });

                    icon.addEventListener("click", () => {
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

                selectedTask = null;
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



    };
});



// searching task all task

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

// search executed task

const extsearch = document.querySelector(".executed-section #search");

extsearch.addEventListener("input", () => {

    const searchValue = extsearch.value.toLowerCase().trim();
    const allTask = executedcontainer.querySelectorAll(".executed-task");

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

// search archive task

const archivesearch = document.querySelector(".archive-section #search");


archivesearch.addEventListener("input", () => {

    const searchValue = archivesearch.value.toLowerCase().trim();
    const allTask = archivecontainer.querySelectorAll(".archive");

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


// filtering task

const periodLinks = document.querySelectorAll("[data-period]");

const periodTitle = document.querySelector(
    ".tools-wrapper .dropdown:nth-child(2) .dropdown-btn"
);

let selectedPeriod = "all";

function checkTaskDate(taskDate, period) {
    if (period === "all") return true;

    if (!taskDate || Number.isNaN(taskDate.getTime())) {
        return false;
    }

    const now = new Date();
    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const day = today.getDay();
    const mondayOffset = day === 0 ? 6 : day - 1;

    const thisMonday = new Date(today);
    thisMonday.setDate(today.getDate() - mondayOffset);

    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(thisMonday.getDate() - 7);

    const nextMonday = new Date(thisMonday);
    nextMonday.setDate(thisMonday.getDate() + 7);

    const lastWeekEnd = new Date(thisMonday);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastThreeMonths = new Date(today);
    lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);

    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    switch (period) {
        case "this-week":
            return taskDate >= thisMonday && taskDate < nextMonday;

        case "last-week":
            return taskDate >= lastMonday && taskDate < thisMonday;

        case "last-month":
            return taskDate >= lastMonth && taskDate <= now;

        case "last-3-months":
            return taskDate >= lastThreeMonths && taskDate <= now;

        case "last-year":
            return taskDate >= lastYear && taskDate <= now;

        default:
            return true;
    }
}


// Recent dropdown
periodLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        selectedPeriod = link.dataset.period;

        periodTitle.innerHTML =
            `${link.textContent} <i class="bi bi-chevron-down"></i>`;

        link.closest("details").removeAttribute("open");

        filterTasks();
    });
});


const settingsName = document.querySelector("#settingsName");
const settingsEmail = document.querySelector("#settingsEmail");
const profilePreviewName = document.querySelector("#profilePreviewName");
const profilePreviewEmail = document.querySelector("#profilePreviewEmail");
const profileAvatar = document.querySelectorAll("#profileAvatar");
const darkThemeToggle = document.querySelector("#darkThemeToggle");
const saveProfile = document.querySelector("#saveProfile");
const settingsFeedback = document.querySelector("#settingsFeedback");
const accentColors = document.querySelectorAll(".accent-color");
const logoutBtn = document.querySelector("#logoutBtn");

// Load saved profile
settingsName.value = user.fullName;
settingsEmail.value = user.email;

function updateProfilePreview() {
    const name = settingsName.value.trim() || "Your Name";
    const email = settingsEmail.value.trim() || "your@gmail.com";

    profileName.textContent = name;
    profileEmail.textContent = email;
    profilePreviewName.textContent = name;
    profilePreviewEmail.textContent = email;
    profileAvatar.forEach(profile => profile.textContent = name.charAt(0).toUpperCase());

}
updateProfilePreview();

settingsName.addEventListener("input", () => {
    updateProfilePreview();
});



// Save profile
saveProfile.addEventListener("click", () => {
    settingsEmail.addEventListener("input", () => {
        isValid = true;
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(settingsEmail.value)) {
            settingsEmail.classList.add("error");
            // emailMessage.textContent =
            //     "Email must end with @gmail.com.";
            // emailMessage.className =
            //     "email-message email-error-message";
            isValid = false;
        }
        else {

            settingsEmail.classList.remove("error");
            updateProfilePreview();
            localStorage.setItem("settingsName", settingsName.value.trim());
            localStorage.setItem("settingsEmail", settingsEmail.value.trim());

            updateProfilePreview();
            isValid = true;
        }
    });

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


    localStorage.removeItem("user");

    window.location.href = "index.html";
});


// side bar log out btn

function logout() {
    localStorage.removeItem("user");

    window.location.href = "index.html"


}
