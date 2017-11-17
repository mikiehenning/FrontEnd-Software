import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MNAtest extends Component {
    render() {
        return (
            <div className="container">
                <form id="contact_form" action="#" method="POST" encType="multipart/form-data">
                    <div className="row">
                        {/*values || severe decrease in food intake = 0 || moderate dec in food intake = 1 || no dec in food intake = 2 */}
                        <label htmlFor="name">Has Food intake declined over the past 3 months due to loss of appetite, digestive problems, chewing or swalloing diffculites?</label><br />
                        <input type="radio" name="appetite" value="0" defaultChecked />severe decrease in food intake <br />
                        <input type="radio" name="appetite" value="1" />modarate decrease in food intake<br />
                        <input type="radio" name="appetite" value="2" />no decrease in food intake
            </div>
                    <br />

                    <div className="row">
                        {/*values || weight loss > 3kg = 0 || does not know = 1 || weight loss between 1/3kg = 2 || no weight loss = 3 */}
                        <label htmlFor="email"> Weight loss during the last 3 months</label><br />
                        <input type="radio" name="WL" value="0" defaultChecked />weight loss greater thean 3kg (6.6 lbs) <br />
                        <input type="radio" name="WL" value="1" />does not know <br />
                        <input type="radio" name="WL" value="2" />weight loss between  1 and 3 kg  (2.2 and 6.6 lbs)<br />
                        <input type="radio" name="WL" value="3" />no weight loss
            </div>
                    <br />
                    <br />

                    <div className="row">
                        {/*values || bed/chair bound = 0 || able to get out of bed/chair = 1 || weight loss between 1/3kg = 2 */}
                        <label htmlFor="message">Mobility</label><br />
                        <input type="radio" name="Mobility" value="0" defaultChecked />bed or chair bound <br />
                        <input type="radio" name="Mobility" value="1" />able to get out of bed/chair but doesnt no go out <br />
                        <input type="radio" name="Mobility" value="2" />weight loss between  1 and 3 kg  (2.2 and 6.6 lbs)
	    </div>
                    <br />

                    <div className="row">
                        {/*values || yes = 0 || no = 1 */}
                        <label htmlFor="QD">Has suffered psychological stress or acute disesease in the last 3 months</label><br />
                        <input type="radio" name="stress" value="0" defaultChecked />yes <br />
                        <input type="radio" name="stress" value="1" />no <br />
                        <br />
                        {/*values || dementia = 0 || mild dementia = 1 || no probs = 2 */}
                        <label htmlFor="QC">Neuropsycologial problems </label><br />
                        <input type="radio" name="neuro" value="0" defaultChecked />severe dementia or depression<br />
                        <input type="radio" name="neuro" value="1" />mild dementia <br />
                        <input type="radio" name="neuro" value="2" />no psychological problems
                <br />
                        <br />

                        {/*values || BMI < 19 = 0 || 19 <= BMI < 21 = 1 || 21 <= BMI < 23 = 2 || 23 <= BMI = 3 */}
                        <label htmlFor="QE">Body Mass index BMI wieght in kg/(height in m)^2 </label><br />
                        <input type="radio" name="BMI" value="0" defaultChecked /> BMI less that 19 <br />
                        <input type="radio" name="BMI" value="1" /> BMI greater than 19 to less than 21<br />
                        <input type="radio" name="BMI" value="2" /> BMI less 21 to less than 23  <br />
                        <input type="radio" name="BMI" value="3" /> BMI 23 or greater
                <br />
                        <br />

                        {/* potentially add a switch statement here if there is no BMI, maybe above. Ex: check box, !BMI = checked box, display bottom, else disp above */}
                        <label htmlFor="message">IF BMI ISNOT AVAILABLE, REPLACE QUESTION F1 WITH QUESTION F2. DO NOT ANSWER QUESTION F2 IF QUESTION F1 IS ALREADY COMPLETED</label><br />
                        <br />
                        {/*values || less than 31 = 0 || 31 or greater = 3 */}
                        <label htmlFor="QE">Calf circumference (CC) in cm </label><br />
                        <input type="radio" name="CC" value="0" defaultChecked />CC less than 31 <br />
                        <input type="radio" name="CC" value="3" />CC 31 or greater<br />
                        <br />
                    </div>

                    {/* Dynamically generate the final submission score on the bottom of the page as they fill it out, so there is some sort of feedback before they submit */}
                    <input id="submit_button" type="submit" value="Sumbit form " />
                </form>
            </div>
        );
    };
}
export default MNAtest