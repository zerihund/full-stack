
  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };
  const Part = ({ name, exercises }) => {
    return (
      <p>
        {name} {exercises}
      </p>
    );
  };
  const Content = ({parts}) => {
    
    return (
      <div>
        {
          parts.map(part=><Part key={part.id} name={part.name} exercises={part.exercises}/>)
        }
  
      </div>
    );
  };
  const Total = ({parts}) => {
    console.log(parts)
   const totalCours= parts.reduce((total,part)=>{
      return total + part.exercises
  
    },0)
    return <p>Number of exercise {totalCours} </p>;
  };
  const Course = ({course}) => {
  
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    );
  };
  export default Course