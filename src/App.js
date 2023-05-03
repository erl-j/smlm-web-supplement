import React, { useState } from 'react';

const sections = [
  {

    name: "Unconditional generation",
    experiments: [
      { "description": "These samples were generated without any constraints.", "id": "unconstrained" }
    ],
  },
  {
    name: "Imputation",
    experiments: [
      { "description": "Imputation. Generated with temperature = 0.75 and p = 0.9.", "id": "imputation,_time" },
      { "description": "Imputation. Generated with temperature = 0.75 and p = 0.9.", "id": "imputation,_pitch_and_time" },
      { "description": "Imputation of high pitches conditioned on low pitches", "id": "imputation,_pitch_upper" },
      { "description": "Imputation of low pitches conditioned on high pitches.", "id": "imputation,_pitch_lower" },
    ],
  },
  {
    name: "Pitch control",
    experiments: [
      { "description": "Generation with pitch constrained to major scale with root at pitch 0", "id": "pitch_constraint,_major_scale" },
      { "description": "Generation with pitch constrained to major pentatonic scale with root at pitch 0", "id": "pitch_constraint,_major_pentatonic_scale" },
    ],
  },
  {
    name: "Duration control",
    experiments: [
      { "description": "Generation with note duration constrained to be less than 8 steps.", "id": "duration_constraint,_<8" },
      { "description": "Generation with note duration constrained to be more than 8 steps.", "id": "duration_constraint,_>8" },
    ],
  },
  {
    name: "Rhythm control",
    experiments: [
      { "description": "Generation with onset time constrained to every 4 steps", "id": "onset_constraint,_4" },
      { "description": "Generation with onset time constrained to every 8 steps", "id": "onset_constraint,_8" },
      { "description": "Generation with onset time constrained to every 6 steps", "id": "onset_constraint,_16" },
    ],
  },
  {
    name: "Combining constraints",
    experiments: [
      {
        "description": "Generation with multiple constraints. Pitch is constrained to major scale with root pitch 0, duration is set to be between 2 and 7, onsets are constrained to every 4 steps. Minimum number of notes is set to 16, maximum number of notes is set to 64. ",
        "id": "multiple_constraints,_major_scale,_onset_on_quarter_notes,_duration_is_4_or_8,_32_active_notes"
      },
    ],
  },
  {
    name: "Dataset",
    experiments: [
      { "description": "Samples drawn from the augmented dataset.", "id": "dataset" }
    ]
  },
]



function App() {

  const [selectedExample, setSelectedExample] = useState(null);
  const audioRef = React.useRef(null);

    // on click this component stops all audio and plays an audio file. 
    const img = (experiment_id_nr) => (
      <div style={{
        border: selectedExample === experiment_id_nr ? "solid 5px aquamarine" : "solid 5px transparent",
      }}
        onClick={
          () => {
            setSelectedExample(experiment_id_nr);
          }
        }
      >
        <img style={{ maxWidth: "100%", height: "auto" }} src={`./supplement/roll/${experiment_id_nr}.png`} />
      </div>
    )
  

  React.useEffect(() => {
    // stop all audio when a new example is selected
    audioRef.current?.pause();

    if (selectedExample) {
      audioRef.current = new Audio(`./supplement/audio/${selectedExample}.wav`);
      // play and set state to null when audio is done playing
      audioRef.current.addEventListener("ended", () => {
        setSelectedExample(null);
      }
      );
      audioRef.current.play();
    }

    console.log("selectedExample", selectedExample);

  }, [selectedExample])

  return (
    <div style={{margin:4}}>
      <h1>Softly Masked Language Model - Web supplement</h1>
      <p>Click a piano roll to listen. The composition is played twice.</p>
      {sections.map((section, idx) => {
        let sectionName = section.name;
        let experiments = section.experiments;
        return  (
        <div key={idx} style={{width: "70%", margin: "auto"}}>
          <h1>{sectionName}</h1>
          {experiments.map((experiment, experiment_idx) =>
            <div key={experiment_idx} style={{ display: "flex", flexDirection: "column", "margin-bottom": 64  }}>
              <p>{experiment.description}</p>
              <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                {img(experiment.id+"_"+0)}
                {img(experiment.id+"_"+1)}
              </div>
              <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                {img(experiment.id+"_"+2)}
                {img(experiment.id+"_"+3)}
              </div>
            </div>
          )}
        </div>)
      })
      }
    </div>
  );
}

export default App;
