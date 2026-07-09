---
id: F006
type: feature
priority: v1
---

# cape integriert projektspezifische Regeln, Technologie-Entscheidungen usw

ein Harness besteht aus drei Schichten oberhalb des LLMs. Die unterste Schicht ist der Vendor Specific Harness, das ist zum Beispiel sowas wie Claude Code Darauf aufsetzend gibt es einen projektübergreifenden Harness, eine Kombination von Skills, Hooks, Guidelines etc. die einen generischen Rahmen definieren, wie man als Engineer mit Codebasis arbeitet das ist so was wie cape und dann gibt es eine dritte darauf aufsetzende spezifische ebene in, der festgelegt wird, wie in diesem Projekt gearbeitet wird, wie werden Commit-Messages geschrieben, welche Technologie wird verwendet, welcher Bug-Tracker wird wie gemacht, wann wird released, etc.

in diesem Feature geht es darum, die zweite und die dritte Ebene zusammenzubringen. Damit CAPEF gut funktionieren kann, muss es projektspezifische Regeln aufgreifen, zum Beispiel wenn es programmiert und diese Regeln anpassen und weiterentwickeln können.

## Outcome

Skills wie /implement, /architect/, /tdd, /grill-with-docs nutzen und entwickeln (direkt oder indirekt) aktiv spezifische Regeln, Guidelines, Ways-of-Working und Konventionen weiter, die spezifisch für das aktuelle Projekt sind.
