//main function
const gpaContainer = document.querySelector(".gpa");
const cgpaContainer = document.querySelector(".cgpa");
const adgpaContainer = document.querySelector(".adgpa");
const adcgpaContainer = document.querySelector(".adcgpa");
const allContainer = [gpaContainer,cgpaContainer,adgpaContainer,adcgpaContainer];

const noneAdder = (adder) => {
    allContainer.forEach(container => {
        container.classList.add("none")
    });
    adder.classList.remove('none');
}

const rowGenarator = (numberOfRows,title,chunk1,chunk2,chunk3,chunk4,addingPlace) =>{
    var innerHtml = title;
    innerHtml += ''
    for(var i = 0; i < numberOfRows; i++){
        if(chunk1 && chunk2 && chunk3 && chunk4){
           innerHtml += chunk1+i+chunk2+i+chunk3+i+chunk4; 
        }
    }
    innerHtml += ''
    addingPlace.innerHTML = innerHtml;
}

const gradeToNumber = (grade) => {
    grade = grade.trim();
    grade = grade.toLowerCase();

        switch (grade){
            case 'a':
                return 5;
            case 'a-':
                return 4.67;
            case 'ab':
                return 4.5;
            case 'b+':
                return 4.33;
            case 'b':
                return 4;
            case 'b-':
                return 3.67;
            case 'bc':
                return 3.5;
            case 'c+':
                return 3.33;
            case 'c':
                return 3;
            case 'c-':
                return 2.67;
            case 'cd':
                return 2.5;
            case 'd+':
                return 2.33;
            case 'd':
                return 2;
            case 'e':
                return 1;
            case 'f':
                return 0;
            default:
                return 0;
        }

}

const getAllInfo = () => {
    const allUnitsField = document.querySelectorAll(".gpaunit");
    const allGradesField = document.querySelectorAll(".gpagrade");
    const allUnitsValue =[];
    const allGradesValue = [];
    const allGradesPoint = [];
    
    for(var i = 0; i < allUnitsField.length; i++ ){
        allUnitsValue.push(Number(allUnitsField[i].value));
        allGradesValue.push(gradeToNumber(allGradesField[i].value));
        allGradesPoint.push(allUnitsValue[i]*allGradesValue[i]);
    }

    return {
        allUnitsValue,
        allGradesValue,
        allGradesPoint
    }
}

const cGetAllInfo = () => {
    const allGPASField = document.querySelectorAll(".cgpagpa");
    const allUnitsField = document.querySelectorAll(".cgpaunit");

    const allGPASValue = [];
    const allUnitsValue = [];
    const allTotalPointValue = [];

    for(var i = 0; i < allUnitsField.length; i++ ){
        allUnitsValue.push(Number(allUnitsField[i].value));
        allGPASValue.push(Number(allGPASField[i].value));
        allTotalPointValue.push(allUnitsValue[i]*allGPASValue[i]);
    }

    return{
        allGPASValue,
        allUnitsValue,
        allTotalPointValue
    }
}

const adcGetAllInfo = () => {
    const allUnitsField = document.querySelectorAll(".adcgpaunits");
    const allGradesField = document.querySelectorAll(".adcgpagpa");
    const allUnitsValue =[];
    const allGradesValue = [];
    const allGradesPoint = [];
    
    for(var i = 0; i < allUnitsField.length; i++ ){
        allUnitsValue.push(Number(allUnitsField[i].value));
        allGradesValue.push(Number(allGradesField[i].value));
        allGradesPoint.push(allUnitsValue[i]*allGradesValue[i]);
    }

    return {
        allUnitsValue,
        allGradesValue,
        allGradesPoint
    }
}

const getArrayTotall = (arr) => {
    return arr.reduce((a,b) => a + b, 0);
}


const gpa = () => {
    //constants
    const gpaCourseForm = document.querySelector('#gpa_courses_form');
    const root = document.querySelector('.gpa_information_prompt')
    const title = '<div class="gpa_information_prompt_titles"><div class="gpa_information_prompt_title">Courses</div><div class="gpa_information_prompt_title">Units</div><div class="gpa_information_prompt_title">Grades</div></div>';
    const chunk1= '<div class="gpa_information_prompt_boxes"><div class="gpa_information_prompt_course"><input type="text" id="course';
    const chunk2 = '"/></div><div class="gpa_information_prompt_unit"><input class="gpaunit" type="text" id="unit';
    const chunk3 = '" /></div><div class="gpa_information_prompt_grade"><input class="gpagrade" type="text" id="grade';
    const chunk4 = '" /></div></div>';
    let numberOfCourses;
    let footer = '<div class="gpa_information_prompt_submit"><div class="gpa_information_prompt_addmore"><button>Add Another Line </button></div><div class="gpa_information_prompt_submit_btn"><button>Submit</button></div></div>';  

    //functions
    noneAdder(gpaContainer);
    gpaCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        numberOfCourses = Number(e.target[0].value);
        e.target[0].value = numberOfCourses;
        rowGenarator(numberOfCourses,title,chunk1,chunk2,chunk3,chunk4,root);
        if(!document.querySelector('.gpa_information_prompt_submit')){
           gpaContainer.insertAdjacentHTML('beforeend',footer); 
        }

        let addMoreBtn = document.querySelector('.gpa_information_prompt_addmore');
        addMoreBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            root.insertAdjacentHTML('beforeend',chunk1+numberOfCourses+chunk2+numberOfCourses+chunk3+numberOfCourses+chunk4);
            numberOfCourses++;
            gpaCourseForm[0].value = numberOfCourses;
        });

        let submitBtn = document.querySelector('.gpa_information_prompt_submit_btn');
        submitBtn.addEventListener('click', (e) => {
            let units= adcGetAllInfo().allUnitsValue;
            let grades = adcGetAllInfo().allGradesValue;
            let gradesPoints = getAllInfo().allGradesPoint;

            const totalGradesPoint = getArrayTotall(gradesPoints);
            const totalUnits = getArrayTotall(units);
            const totalGrades = getArrayTotall(grades);

            console.log(totalGradesPoint, gradesPoints)

            const answer = totalGradesPoint  / totalUnits;

            if(!document.querySelector('.gpa_result')){
               gpaContainer.insertAdjacentHTML('beforeend','<div class="gpa_result"><div class="gpa_result_comment"><span id="charger">Excellent! </span>Your GPA is <span id="gpa_number">'+answer+'</span></div></div>') 
            }else{
                document.querySelector('.gpa_result').innerHTML = '<div class="gpa_result_comment"><span id="charger">Excellent! </span>Your GPA is <span id="gpa_number">'+answer+'</span></div>'
            }
        })
    })
}

const cgpa = () => {
    noneAdder(cgpaContainer)
    //const
    const cgpaCourseForm = document.querySelector('#cgpa_courses_form');
    const root = document.querySelector('.cgpa_information_prompt')
    const title = '<div class="gpa_information_prompt_titles"><div class="gpa_information_prompt_title">Semesters</div><div class="gpa_information_prompt_title">CGPA</div><div class="gpa_information_prompt_title">Units</div></div>';
    const chunk1= '<div class="gpa_information_prompt_boxes"><div class="gpa_information_prompt_course">Semester';
    const chunk2 = '</div><div class="gpa_information_prompt_unit"><input class="gpaunit cgpagpa" type="text" id="cgpagpa';
    const chunk3 = '" /></div><div class="gpa_information_prompt_grade"><input class="gpagrade cgpaunit" type="text" id="cgpaunits';
    const chunk4 = '" /></div></div>';
    let numberOfSemesters;
    let footer = '<div class="cgpa_information_prompt_submit gpa_information_prompt_submit"><div class="gpa_information_prompt_addmore cgpa_information_prompt_addmore"><button>Add Another Line </button></div><div class="gpa_information_prompt_submit_btn cgpa_information_prompt_submit_btn"><button>Submit</button></div></div>';  

    //functions
    cgpaCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        numberOfSemesters = Number(e.target[0].value);
        e.target[0].value = numberOfSemesters;
        rowGenarator(numberOfSemesters,title,chunk1,chunk2,chunk3,chunk4,root);
        if(!document.querySelector('.cgpa_information_prompt_submit')){
           cgpaContainer.insertAdjacentHTML('beforeend',footer); 
        }

        let addMoreBtn = document.querySelector('.cgpa_information_prompt_addmore');
        addMoreBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            root.insertAdjacentHTML('beforeend',chunk1+numberOfSemesters+chunk2+numberOfSemesters+chunk3+numberOfSemesters+chunk4);
            numberOfSemesters++;
            cgpaCourseForm[0].value = numberOfSemesters;
        });

        let submitBtn = document.querySelector('.cgpa_information_prompt_submit_btn');
        submitBtn.addEventListener('click', (e) => {
            let allUnits = cGetAllInfo().allUnitsValue;
            let allTotalPoints = cGetAllInfo().allTotalPointValue;

            const totalAllTotalPoints = getArrayTotall(allTotalPoints);
            const totalUnits = getArrayTotall(allUnits);

            console.log(totalAllTotalPoints, totalUnits)

            const answer = totalAllTotalPoints  / totalUnits;

            if(!document.querySelector('.cgpa_result')){
               cgpaContainer.insertAdjacentHTML('beforeend','<div class="cgpa_result gpa_result"><div class="cgpa_result_comment gpa_result_comment"><span id="ccharger">Excellent! </span>Your CGPA after '+numberOfSemesters+' Semesters is <span id="cgpa_number">'+answer+'</span></div></div>') 
            }else{
                document.querySelector('.cgpa_result').innerHTML = '<div class="gpa_result_comment cgpa_result_comment"><span id="ccharger">Excellent! </span>Your CGPA after '+numberOfSemesters+' Semesters is <span id="cgpa_number gpa_number">'+answer+'</span></div>'
            }
        })
    })
}

const adgpa = () => {
    noneAdder(adgpaContainer)
    //const
    // const adgpaCourseForm = document.querySelector('#adgpa_courses_form');
    // const wantedGpaInput = document.querySelector('#adgpacgpain');
    // const root = document.querySelector('.adgpa_information_prompt')
    // const title = '<div class="gpa_information_prompt_titles"><div class="gpa_information_prompt_title">Courses</div><div class="gpa_information_prompt_title">Units</div><div class="gpa_information_prompt_title">Grades</div></div>';
    // const chunk1= '<div class="gpa_information_prompt_boxes"><div class="gpa_information_prompt_course"><input class="adgpacourse" type="text" id="course';
    // const chunk2 = '"/></div><div class="gpa_information_prompt_unit"><input class="gpaunit adgpagpa" type="text" id="unit';
    // const chunk3 = '" /></div><div class="gpa_information_prompt_grade"><input class="adgpagrade gpagrade" type="text" id="grade';
    // const chunk4 = '" /></div></div>';
    // let numberOfCourses;
    // let wantedGpa = 4.5;
    // let footer = '<div class="gpa_information_prompt_submit"><div class="adgpa_information_prompt_addmore"><button>Add Another Line </button></div><div class="adgpa_information_prompt_submit_btn"><button>Submit</button></div></div>';
    
    // //seting the wanteds
    // wantedGpaInput.addEventListener('change', (e)=>{
    //     if(e.target.value.trim() !== ''){
    //         wantedGpa = Number(e.target.value.trim());
    //     }else{
    //         wantedGpa = 4.5;
    //     }
    //     e.target.value = wantedGpa;
    // })

    // adgpaCourseForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     numberOfCourses = Number(e.target[0].value);
    //     e.target[0].value = numberOfCourses;
    //     rowGenarator(numberOfCourses,title,chunk1,chunk2,chunk3,chunk4,root);
    //     if(!document.querySelector('.adgpa_information_prompt_submit')){
    //        adgpaContainer.insertAdjacentHTML('beforeend',footer); 
    //     }

    //     let addMoreBtn = document.querySelector('.adgpa_information_prompt_addmore');
    //     addMoreBtn.addEventListener('click', (e)=>{
    //         e.preventDefault();
    //         root.insertAdjacentHTML('beforeend',chunk1+numberOfCourses+chunk2+numberOfCourses+chunk3+numberOfCourses+chunk4);
    //         numberOfCourses++;
    //         adgpaCourseForm[0].value = numberOfCourses;
    //     });

    //     let submitBtn = document.querySelector('.adgpa_information_prompt_submit_btn');
    //     submitBtn.addEventListener('click', (e) => {
    //         console.log("this is submit")
    //     })
    // });
}

const adcgpa = () => {
    noneAdder(adcgpaContainer)
    //const
    const adcgpaCourseForm = document.querySelector('#adcgpa_courses_form');
    const wantedCgpaInput = document.querySelector('#adcgpacgpain');
    const wantedUnitsInput = document.querySelector('#adcgpaunitin');
    const root = document.querySelector('.adcgpa_information_prompt')
    const title = '<div class="gpa_information_prompt_titles"><div class="gpa_information_prompt_title">Semesters</div><div class="gpa_information_prompt_title">CGPA</div><div class="gpa_information_prompt_title">Units</div></div>';
    const chunk1= '<div class="gpa_information_prompt_boxes"><div class="gpa_information_prompt_course">Semester';
    const chunk2 = '</div><div class="gpa_information_prompt_unit"><input class="gpaunit adcgpagpa" type="text" id="adcgpagpa';
    const chunk3 = '" /></div><div class="gpa_information_prompt_grade"><input class="gpagrade adcgpaunits" type="text" id="adcgpaunits';
    const chunk4 = '" /></div></div>';
    let numberOfSemesters;
    let wantedCgpa = 4.5;
    let wantedUnits = 20;
    let footer = '<div class="adcgpa_information_prompt_submit gpa_information_prompt_submit"><div class="gpa_information_prompt_addmore adcgpa_information_prompt_addmore"><button>Add Another Line </button></div><div class="gpa_information_prompt_submit_btn adcgpa_information_prompt_submit_btn"><button>Submit</button></div></div>';

    //seting the wanteds
    wantedCgpaInput.addEventListener('change', (e)=>{
        if(e.target.value.trim() !== ''){
            wantedCgpa = Number(e.target.value.trim());
        }else{
            wantedCgpa = 4.5;
        }
        e.target.value = wantedCgpa;
    })

    wantedUnitsInput.addEventListener('change', (e)=>{
        if(e.target.value.trim() !== ''){
            wantedUnits = Number(e.target.value.trim());
        }else{
            wantedUnits = 4.5;
        }
        e.target.value = wantedUnits;
    })

    
    adcgpaCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        numberOfSemesters = Number(e.target[0].value);
        e.target[0].value = numberOfSemesters;
        rowGenarator(numberOfSemesters,title,chunk1,chunk2,chunk3,chunk4,root);
        if(!document.querySelector('.adcgpa_information_prompt_submit')){
            adcgpaContainer.insertAdjacentHTML('beforeend',footer); 
        }
        let addMoreBtn = document.querySelector('.adcgpa_information_prompt_addmore');
        addMoreBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        root.insertAdjacentHTML('beforeend',chunk1+numberOfSemesters+chunk2+numberOfSemesters+chunk3+numberOfSemesters+chunk4);
        numberOfSemesters++;
        adcgpaCourseForm[0].value = numberOfSemesters;
    });
    let submitBtn = document.querySelector('.adcgpa_information_prompt_submit_btn');
    submitBtn.addEventListener('click', (e) => {
        let units= adcGetAllInfo().allUnitsValue;
        let grades = adcGetAllInfo().allGradesValue;
        let gradesPoints = adcGetAllInfo().allGradesPoint;

        const totalGradesPoint = getArrayTotall(gradesPoints);
        const totalUnits = getArrayTotall(units);
        const totalGrades = getArrayTotall(grades);

        console.log(totalGradesPoint,totalGrades,totalUnits)

        const adPoint = wantedCgpa * (totalUnits + wantedUnits) - totalGradesPoint;

        const answer = adPoint  / wantedUnits;

        if(!document.querySelector('.adcgpa_result')){
           adcgpaContainer.insertAdjacentHTML('beforeend','<div class="gpa_result"><div class="gpa_result_comment"><span id="charger">Excellent! </span>You will atleast  <span id="gpa_number">'+answer+'</span> to make your cgpa '+wantedCgpa+'</div></div>') 
        }else{
            document.querySelector('.adcgpa_result').innerHTML = '<div class="gpa_result_comment"><span id="charger">Excellent! </span>Your You will need atleast  <span id="gpa_number">'+answer+'</span> to make your cgpa '+wantedCgpa+'</div>'
        }
    })    
    })   
}

adgpa();
const todoprompt = document.querySelector("#todoprompt");
todoprompt.addEventListener("change", (e)=>{
    if(e.target.value === '' || e.target.value === "GPA"){
        gpa();
    }else if(e.target.value === 'CGPA'){
        cgpa();
    }else if(e.target.value === 'ADGPA'){
        adgpa();
    }else if(e.target.value === 'ADCGPA'){
        adcgpa();
    }
})