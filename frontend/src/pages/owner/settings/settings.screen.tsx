import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

import Container from "../../../components/style/container.component";
import Content from "../../../components/style/content.component";
import Button from "../../../components/forms/button.component";
import Text from "../../../components/style/text.component";
import {useDispatch, useSelector} from "react-redux";
import {updateTitleAction} from "../../../store/slices/ui.slice";
import Dropdown from "../../../components/forms/dropdown";
import {
  createExam,
  getExamByUuid,
  getQuestionTypes,
  UpdateExamSettings,
  updateExamSettings
} from "../../../store/slices/exam.slice";
import {Exam} from "../../../models/exam.model";
import {RootState} from "../../../store/configure.store";

interface SettingsParams {
  testOwnerUuid: string;
}

const SettingsScreen = () => {
  const [testName, setTestName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const dispatch = useDispatch();
  const history = useHistory();
  const examState = useSelector((state: RootState) => state.exam);

  const {testOwnerUuid} = useParams<SettingsParams>();


  useEffect(() => {
    dispatch(updateTitleAction("Pass | Exam settings"));
  });

  useEffect(() => {
    dispatch(getQuestionTypes());
  }, []);

  useEffect(() => {
    dispatch(getExamByUuid(testOwnerUuid, examState.questionTypes));
  }, [examState.questionTypes])



  const settings = [
      "Show results overview",
      "Allow going back to previous question",
      "Display points per question"
  ]

  function onNextButtonClicked() {
    // convert component's state to something backend will understand

    const update: UpdateExamSettings = {
      id: testOwnerUuid,
      name: testName,
      owner_name: ownerName,
      settings: {
        id: examState.exam.settings.id,
        show_points_per_question: selectedOptions.includes('Display points per question'),
        show_results_overview: selectedOptions.includes('Show results overview'),
        allow_going_back: selectedOptions.includes('Allow going back to previous question')
      }
    }

    // @ts-ignore
    dispatch(updateExamSettings(update)).then(x => {
      history.push(`/${testOwnerUuid}/editor/participants`);
    });
  }

  return (
      <Container>
        <Content>
          <Text h1 style={{marginBottom: 20}}>
            Test Setup
            {/*Settings screen*/}
            {/*{testOwnerUuid}*/}
          </Text>
          <form>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div>
                <div>
                  Email
                </div>

                <div>
                  Title
                </div>

                <div>
                  Name
                </div>

                <div>
                  Start Date
                </div>

                <div>
                  Test Duration
                </div>

                <div>
                  Participants Settings
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <input type='text'
                       placeholder='Enter your email'
                       value={ownerEmail}
                       onChange={(e) => setOwnerEmail(e.target.value)}/>

                <input type='text'
                       placeholder='Enter the exam name'
                       value={testName}
                       onChange={(e) => setTestName(e.target.value)}/>

                <input type='text'
                       placeholder='Write your name'
                       value={ownerName}
                       onChange={(e) => setOwnerName(e.target.value)}/>
                <input type='text'
                       onFocus={
                         (e)=> {
                           e.currentTarget.type = "date";
                           e.currentTarget.focus();
                         }
                       }
                       placeholder='Start Date'
                       value={startDate}
                       onChange={(e) => setStartDate(e.target.value)}/>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <input type='text'
                         onFocus={
                           (e)=> {
                             e.currentTarget.type = "time";
                             e.currentTarget.focus();
                           }
                         }
                         placeholder='Start Time'
                         value={startTime}
                         onChange={(e) => setStartTime(e.target.value)}/>
                  <input type='text'
                         onFocus={
                           (e)=> {
                             e.currentTarget.type = "time";
                             e.currentTarget.focus();
                           }
                         }
                         placeholder='End Time'
                         value={endTime}
                         onChange={(e) => setEndTime(e.target.value)}/>
                </div>
                <br/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Dropdown options={settings} onChange={(e) => setSelectedOptions(e)}/>
                </div>
              </div>
            </div>

          </form>

          <Button text="Next (add participants)" color="primary" onClick={() => onNextButtonClicked()}/>
        </Content>
      </Container>
  );
};

export default SettingsScreen;
