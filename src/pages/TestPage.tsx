import { useState } from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, Button, Paper, Box, Container, Stack } from '@mui/material';
import Page from '../components/Page';
import { trainingData } from '../data/trainingData';

const categories = [
  { key: 'crust-codes', label: 'Crust Codes' },
  { key: 'ingredient-codes', label: 'Ingredient Codes' },
  { key: 'portion-codes', label: 'Portion Codes' },
];

type CategoryKey = 'crust-codes' | 'ingredient-codes' | 'portion-codes';

type SelectedState = Record<CategoryKey, boolean>;

type QuizState = {
  question: string;
  options: string[];
  answer: string;
  category: CategoryKey;
  prompt: string;
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomOptions<T>(arr: T[], count: number, exclude: T): T[] {
  // Return up to 'count' unique random items from arr, excluding 'exclude'
  const filtered = arr.filter((item) => item !== exclude);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getAllPossibleQuestions(selected: SelectedState): {category: CategoryKey, question: string, answer: string, prompt: string, options: string[]}[] {
  const result: {category: CategoryKey, question: string, answer: string, prompt: string, options: string[]}[] = [];
  if (selected['crust-codes']) {
    const items = trainingData['crust-codes'];
    for (const item of items) {
      const answer = item.name;
      const prompt = `What does the crust code "${item.code}" mean?`;
      const incorrect = getRandomOptions(items.map(i => i.name), 3, answer);
      const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
      result.push({ category: 'crust-codes', question: item.code, answer, prompt, options });
    }
  }
  if (selected['ingredient-codes']) {
    const items = trainingData['ingredient-codes'];
    for (const item of items) {
      const answer = item.name;
      const prompt = `What ingredient does the code "${item.code}" represent?`;
      const incorrect = getRandomOptions(items.map(i => i.name), 3, answer);
      const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
      result.push({ category: 'ingredient-codes', question: item.code, answer, prompt, options });
    }
  }
  if (selected['portion-codes']) {
    const items = trainingData['portion-codes'];
    for (const item of items) {
      const answer = item.name;
      const prompt = `What does the portion code "${item.code}" mean?`;
      const incorrect = getRandomOptions(items.map(i => i.name), 3, answer);
      const options = [answer, ...incorrect].sort(() => Math.random() - 0.5);
      result.push({ category: 'portion-codes', question: item.code, answer, prompt, options });
    }
  }
  return result;
}

const TestPage = () => {
  const [selected, setSelected] = useState<SelectedState>({
    'crust-codes': true,
    'ingredient-codes': true,
    'portion-codes': true,
  });
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [asked, setAsked] = useState<Set<string>>(new Set());
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [completed, setCompleted] = useState(false);
  const [testInProgress, setTestInProgress] = useState(false);

  const handleToggle = (key: CategoryKey) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getQuestionKey = (q: {category: CategoryKey, question: string}) => `${q.category}:${q.question}`;

  const allPossibleQuestions = getAllPossibleQuestions(selected);
  const possibleCount = allPossibleQuestions.length;

  const startTest = () => {
    setScore({ correct: 0, total: 0 });
    setAsked(new Set());
    setCompleted(false);
    setTestInProgress(true);
    nextQuestion();
  };

  const nextQuestion = () => {
    const allQuestions = getAllPossibleQuestions(selected);
    const available = allQuestions.filter(q => !asked.has(getQuestionKey(q)));
    if (available.length === 0) {
      setQuiz(null);
      setCompleted(true);
      setTestInProgress(false);
      return;
    }
    const q = getRandom(available);
    setQuiz({
      question: q.question,
      options: q.options,
      answer: q.answer,
      category: q.category,
      prompt: q.prompt,
    });
    setSelectedOption(null);
    setShowFeedback(false);
    setAsked((prev) => new Set(prev).add(getQuestionKey(q)));
  };

  const handleOptionClick = (option: string) => {
    if (!showFeedback && quiz) {
      setSelectedOption(option);
      setShowFeedback(true);
      setScore((prev) => ({
        correct: prev.correct + (option === quiz.answer ? 1 : 0),
        total: prev.total + 1,
      }));
    }
  };

  const handleReset = () => {
    setScore({ correct: 0, total: 0 });
    setAsked(new Set());
    setCompleted(false);
    setQuiz(null);
    setSelectedOption(null);
    setShowFeedback(false);
    setTestInProgress(false);
  };

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 4 } }}>
      <Page title="Test Your Knowledge">
        <Stack spacing={2}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 1 }}>
            <Typography variant="h6" gutterBottom>
              Choose what you want to be tested on:
            </Typography>
            <FormGroup row sx={{ flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <FormControlLabel
                  key={cat.key}
                  control={
                    <Checkbox
                      checked={selected[cat.key as CategoryKey]}
                      onChange={() => handleToggle(cat.key as CategoryKey)}
                      color="primary"
                      disabled={testInProgress}
                    />
                  }
                  label={cat.label}
                  sx={{ minWidth: { xs: '100%', sm: 180 } }}
                />
              ))}
            </FormGroup>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Possible questions: {possibleCount}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={startTest} 
                disabled={possibleCount === 0 || testInProgress}
                fullWidth
              >
                Start Test
              </Button>
              {testInProgress && !completed && (
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={handleReset}
                  fullWidth
                >
                  Stop Test
                </Button>
              )}
            </Box>
          </Paper>
          {quiz && !completed && (
            <>
              <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {quiz.prompt}
                </Typography>
                <Stack spacing={1}>
                  {quiz.options.map((option, idx) => (
                    <Button
                      key={idx}
                      variant={selectedOption === option ? 'contained' : 'outlined'}
                      color={showFeedback
                        ? option === quiz.answer
                          ? 'success'
                          : selectedOption === option
                            ? 'error'
                            : 'primary'
                        : 'primary'}
                      onClick={() => handleOptionClick(option)}
                      disabled={showFeedback}
                      fullWidth
                      sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, py: { xs: 1.2, sm: 1.5 } }}
                    >
                      {option}
                    </Button>
                  ))}
                </Stack>
                {showFeedback && (
                  <Typography sx={{ mt: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }} color={selectedOption === quiz.answer ? 'success.main' : 'error.main'}>
                    {selectedOption === quiz.answer ? 'Correct!' : `Incorrect. The correct answer is: ${quiz.answer}`}
                  </Typography>
                )}
                {showFeedback && (
                  <Button variant="outlined" sx={{ mt: 2 }} onClick={() => nextQuestion()} fullWidth>
                    Next Question
                  </Button>
                )}
              </Paper>
              <Paper sx={{ p: 2, mb: 1, bgcolor: 'background.default' }}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  Score: {score.correct} / {score.total}
                </Typography>
              </Paper>
            </>
          )}
          {completed && (
            <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
                Test Complete!
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                You answered {score.correct} out of {score.total} questions correctly.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Page>
    </Container>
  );
};

export default TestPage; 