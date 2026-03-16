async function loadDailyProblem() {
    const response=await fetch("http://localhost:5000/daily-problem");
    const problem=await response.json();
    const container=document.getElementById("daily-problem");

    container.innerHTML=`
    <h3>${problem.title}</h3>
    <p>Difficulty: ${problem.difficulty}</p>`
    
}