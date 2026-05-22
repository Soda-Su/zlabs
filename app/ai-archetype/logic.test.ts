import test from "node:test";
import assert from "node:assert/strict";
import { getResultState, aggregateQuizAnswers, deserializeResultState, resolveArchetypeFromAnswers, serializeResultState } from "./logic";
import { quizQuestions } from "./data";

test("aggregateQuizAnswers tallies each pole deterministically", () => {
  const answers = [
    quizQuestions[0].answers[0],
    quizQuestions[1].answers[1],
    quizQuestions[2].answers[0],
    quizQuestions[6].answers[1]
  ];
  const result = aggregateQuizAnswers(answers);

  assert.equal(result.tally.observe, 1);
  assert.equal(result.tally.flux, 1);
  assert.equal(result.tally.solo, 1);
  assert.equal(result.tally.speculative, 1);
  assert.equal(result.scores.drive, -1);
  assert.equal(result.scores.method, 1);
  assert.equal(result.scores.orbit, -1);
  assert.equal(result.scores.signal, 1);
});

test("resolveArchetypeFromAnswers uses signal and fixed priority as tie breakers", () => {
  const answers = [
    quizQuestions[0].answers[0],
    quizQuestions[3].answers[1],
    quizQuestions[1].answers[0],
    quizQuestions[4].answers[1],
    quizQuestions[2].answers[0],
    quizQuestions[5].answers[0],
    quizQuestions[6].answers[1]
  ];
  const resolved = resolveArchetypeFromAnswers(answers);

  assert.equal(resolved.result.archetype, "dreamer");
  assert.equal(resolved.result.signal, "speculative");
});

test("serializeResultState round-trips through deserializeResultState", () => {
  const state = getResultState("conductor", "grounded", {
    palette: "electric",
    expression: "focused",
    accessory: "visor"
  });
  const params = serializeResultState(state);
  const roundTrip = deserializeResultState(params);

  assert.deepEqual(roundTrip, state);
});
