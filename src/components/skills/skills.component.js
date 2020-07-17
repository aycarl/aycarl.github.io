import React from "react";

import "./skills.styles.css";

const MySkills = {
  frontEnd: [
    { id: 0, name: `Javascript: React | Redux` },
    { id: 1, name: "Bootstrap" },
    { id: 2, name: "HTML5" },
    { id: 3, name: "CSS3 | LESS" },
  ],
  backEnd: [
    { id: 0, name: "C#: .NET Core | Framework" },
    { id: 1, name: "Javascript" },
    { id: 2, name: "python" },
    { id: 3, name: "MySQL | MS SQL" },
    { id: 4, name: "Firebase | Mongo DB" },
  ],
  tools: [
    { id: 0, name: "Git: GitHub | Team Foundation" },
    { id: 1, name: "Adobe: XD | Illustrator | InDesign" },
  ],
};

const Skills = () => {
  return (
    <div className="section">
      <h3>Skills Overview</h3>
      <div className="skillsContainer">
        <SkillSection
          key={0}
          sectionName="Front-End"
          sectionList={MySkills.frontEnd}
        />
        <SkillSection
          key={1}
          sectionName="Back-End"
          sectionList={MySkills.backEnd}
        />
        <SkillSection
          key={2}
          sectionName="Tools"
          sectionList={MySkills.tools}
        />
      </div>
    </div>
  );
};

const SkillSection = ({ sectionName, sectionList }) => {
  return (
    <div>
      <strong>{sectionName}</strong>
      <ul>
        {sectionList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
