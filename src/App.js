import React, { useState } from 'react';

sections = [
  {name: "Dataset",
  experiments: [
    { "description": "Samples drawn from the augmented dataset", "id": "dataset" }
  ]},
  {

    name: "Unconditional generation",
    experiments: [
      { "description": "These samples were generated without any constraints", "id": "unconstrained" }
    ],
  },
  {
    name: "Imputation",
    experiments: [
      { "description": "Sequence imputation of an rectangular area of a piano roll. Generated with temperature = 0.75 and p=0.9.", "id": "imputation,_pitch_and_time" },
      { "description": "Sequence imputation of an rectangular area in pitch-time space. Generated with temperature = 0.75 and p=0.9.", "id": "imputation,_time" },
      { "description": "Generation of high pitches conditioned on low pitches", "id": "imputation,_pitch_upper" },
      { "description": "Generation of low pitches conditioned on high pitches.", "id": "imputation,_pitch_lower" },
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
      { "description": "Generation with multiple constraints. Pitch is constrained to major scale with root pitch 0, duration is set to be between 2 and 7, onsets are constrained to every 4 steps. Minimum number of notes is set to 16, maximum number of notes is set to 64. ", "id": "multiple_constraints,_major_scale,_onset_on_quarter_notes,_duration_is_4_or_8,_32_active_notes" },
    ],
  }
]

const experiments = [
  "unconstrained",
  "imputation,_time",
  "imputation,_pitch_lower",
  "imputation,_pitch_and_time",
  "imputation,_pitch_upper",
  "pitch_constraint,_major_scale",
  "pitch_constraint,_major_pentatonic_scale",
  "duration_constraint,_<8",
  "duration_constraint,_>8",
  "onset_constraint,_4",
  "onset_constraint,_8",
  "onset_constraint,_16",
  "multiple_constraints,_major_scale,_onset_on_quarter_notes,_duration_is_4_or_8,_32_active_notes",

]

const playAudio = (experiment, nr) => {
  document.querySelectorAll("audio").forEach((audio) => audio.pause());
  new Audio(`./supplement/audio/${experiment}_${nr}.wav`).play()
}


function App() {

  const [selectedExample, setSelectedExample] = useState(null);
  const audioRef = React.useRef(null);

  // on click this component stops all audio and plays an audio file. 
  const img = (experiment, nr) => (
    <div style={{
      margin: 16,
      border: selectedExample === experiment + "_" + nr ? "solid 4px green" : "solid 4px black",
    }}
      onClick={
        () => {
          setSelectedExample(experiment + "_" + nr);
        }
      }
    >
      <img style={{ maxWidth: "100%", height: "auto" }} src={`./supplement/roll/${experiment}_${nr}.png`} />
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

  }, [selectedExample])

  return (

    <div>
      <h1>Softly Masked Language Model - Web supplement</h1>
      <p>Click a piano roll to listen. The composition is played twice.</p>
      {experiments.map((experiment) =>

        <div style={{ display: "flex", flexDirection: "column", width: "70%", margin: "auto" }}>
          <h1>{experiment}</h1>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {img(experiment, 0)}
            {img(experiment, 1)}
          </div>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {img(experiment, 2)}
            {img(experiment, 3)}
          </div>
        </div>
      )
      }
    </div>
  );
}

export default App;
