import React from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import WordTitle from 'components/Word/WordTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Definition from 'components/Word/Definition';
import Examples from 'components/Word/Examples';

@withRouter
@inject('store')
@observer
export default class Word extends React.Component {
  componentWillMount() {
    let {word} = this.props.match.params;
    this.props.store.word.query(word);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let {word: oldWord} = prevProps.match.params;
    let {word} = this.props.match.params;
    if (oldWord !== word)
      this.props.store.word.query(word);
  }

  componentWillUnmount() {
    this.props.store.word.reset();
  }

  render() {
    const {word, wordData, progressing} = this.props.store.word;
    if (progressing)
      return (
        <CircularProgress/>
      );
    return (
        <Card>
          <CardContent>
            {word!==null?<WordTitle wordData={wordData}/>: "Word Not found"}
            <Definition definitions={wordData['defs']}/>
            <Examples examples={wordData['sams']}/>
          </CardContent>
        </Card>
    );
  }
}