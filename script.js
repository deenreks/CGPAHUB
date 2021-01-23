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

const inputGetter = (boxId) => {
    const box = document.querySelector(boxId);
    return box.value;
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
            let units= getAllInfo().allUnitsValue;
            let grades = getAllInfo().allGradesValue;
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
    console.log("cgpa")
}

const adgpa = () => {
    noneAdder(adgpaContainer)
    console.log("adgpa")
}

const adcgpa = () => {
    noneAdder(adcgpaContainer)
    console.log("adcgpa")
}

gpa();
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