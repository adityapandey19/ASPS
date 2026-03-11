export const mockSyllabus = {
  course: "Data Structures & Algorithms",
  units: [
    {
      id: "u1",
      name: "Unit 1: Linear Data Structures",
      topics: [
        {
          id: "t1",
          name: "Arrays",
          complexity: "Easy",
          exposure: 3,
          completed: true,
          subtopics: [
            { id: "st1", name: "1D Arrays", exposure: 4, completed: true },
            { id: "st2", name: "2D Arrays", exposure: 3, completed: true },
            { id: "st3", name: "Array Rotations", exposure: 2, completed: false },
          ],
        },
        {
          id: "t2",
          name: "Linked Lists",
          complexity: "Medium",
          exposure: 2,
          completed: false,
          subtopics: [
            { id: "st4", name: "Singly Linked List", exposure: 3, completed: true },
            { id: "st5", name: "Doubly Linked List", exposure: 2, completed: false },
            { id: "st6", name: "Circular Linked List", exposure: 1, completed: false },
          ],
        },
        {
          id: "t3",
          name: "Stacks",
          complexity: "Easy",
          exposure: 2,
          completed: false,
          subtopics: [
            { id: "st7", name: "Stack using Array", exposure: 3, completed: true },
            { id: "st8", name: "Stack using Linked List", exposure: 1, completed: false },
          ],
        },
        {
          id: "t4",
          name: "Queues",
          complexity: "Medium",
          exposure: 1,
          completed: false,
          subtopics: [
            { id: "st9", name: "Simple Queue", exposure: 2, completed: false },
            { id: "st10", name: "Circular Queue", exposure: 1, completed: false },
            { id: "st11", name: "Priority Queue", exposure: 0, completed: false },
          ],
        },
      ],
    },
    {
      id: "u2",
      name: "Unit 2: Non-Linear Data Structures",
      topics: [
        {
          id: "t5",
          name: "Trees",
          complexity: "Hard",
          exposure: 1,
          completed: false,
          subtopics: [
            { id: "st12", name: "Binary Trees", exposure: 2, completed: false },
            { id: "st13", name: "BST", exposure: 1, completed: false },
            { id: "st14", name: "AVL Trees", exposure: 0, completed: false },
          ],
        },
        {
          id: "t6",
          name: "Graphs",
          complexity: "Hard",
          exposure: 0,
          completed: false,
          subtopics: [
            { id: "st15", name: "Graph Representation", exposure: 1, completed: false },
            { id: "st16", name: "BFS", exposure: 0, completed: false },
            { id: "st17", name: "DFS", exposure: 0, completed: false },
          ],
        },
        {
          id: "t7",
          name: "Heaps",
          complexity: "Hard",
          exposure: 0,
          completed: false,
          subtopics: [
            { id: "st18", name: "Min Heap", exposure: 0, completed: false },
            { id: "st19", name: "Max Heap", exposure: 0, completed: false },
          ],
        },
      ],
    },
    {
      id: "u3",
      name: "Unit 3: Algorithms",
      topics: [
        {
          id: "t8",
          name: "Recursion",
          complexity: "Medium",
          exposure: 3,
          completed: true,
          subtopics: [
            { id: "st20", name: "Basic Recursion", exposure: 4, completed: true },
            { id: "st21", name: "Backtracking", exposure: 2, completed: false },
          ],
        },
        {
          id: "t9",
          name: "Sorting",
          complexity: "Medium",
          exposure: 2,
          completed: false,
          subtopics: [
            { id: "st22", name: "Bubble Sort", exposure: 4, completed: true },
            { id: "st23", name: "Merge Sort", exposure: 3, completed: true },
            { id: "st24", name: "Quick Sort", exposure: 2, completed: false },
            { id: "st25", name: "Heap Sort", exposure: 0, completed: false },
          ],
        },
        {
          id: "t10",
          name: "Dynamic Programming",
          complexity: "Hard",
          exposure: 0,
          completed: false,
          subtopics: [
            { id: "st26", name: "Memoization", exposure: 1, completed: false },
            { id: "st27", name: "Tabulation", exposure: 0, completed: false },
          ],
        },
      ],
    },
  ],
};

export const mockStudyPlan = {
  date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  hours: 3,
  topics: [
    { id: "t2", name: "Linked Lists", unit: "Unit 1", duration: 60, priority: "High", complexity: "Medium" },
    { id: "t3", name: "Stacks", unit: "Unit 1", duration: 45, priority: "High", complexity: "Easy" },
    { id: "t5", name: "Trees (Intro)", unit: "Unit 2", duration: 75, priority: "Medium", complexity: "Hard" },
  ],
};

export const mockAnalytics = {
  coverage: { completed: 8, total: 22, percentage: 36 },
  exposureDistribution: [
    { level: "Not Studied", count: 7, color: "#3A3A3A" },
    { level: "Read", count: 4, color: "#4F9DFF" },
    { level: "Practiced", count: 5, color: "#9B59B6" },
    { level: "Revised", count: 4, color: "#3AE374" },
    { level: "Tested", count: 2, color: "#FFA502" },
  ],
  revisionHistory: [
    { date: "Feb 01", sessions: 2 },
    { date: "Feb 05", sessions: 1 },
    { date: "Feb 08", sessions: 3 },
    { date: "Feb 12", sessions: 2 },
    { date: "Feb 15", sessions: 4 },
    { date: "Feb 19", sessions: 1 },
    { date: "Feb 22", sessions: 5 },
    { date: "Feb 26", sessions: 3 },
    { date: "Mar 01", sessions: 2 },
    { date: "Mar 05", sessions: 4 },
    { date: "Mar 08", sessions: 3 },
  ],
  heatmapData: generateHeatmap(),
  priorityDistribution: [
    { topic: "Linked Lists", priority: 92 },
    { topic: "Trees", priority: 87 },
    { topic: "Graphs", priority: 85 },
    { topic: "DP", priority: 78 },
    { topic: "Heaps", priority: 72 },
    { topic: "Queues", priority: 65 },
  ],
  recentActivity: [
    { date: "Today", action: "Revised Arrays", duration: "45 min" },
    { date: "Yesterday", action: "Practiced Recursion", duration: "1h 20 min" },
    { date: "Mar 07", action: "Read Stacks Chapter", duration: "30 min" },
    { date: "Mar 06", action: "Tested Sorting Algorithms", duration: "2h 10 min" },
  ],
};

function generateHeatmap() {
  const data = [];
  const now = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const rand = Math.random();
    data.push({
      date: dateStr,
      count: rand < 0.4 ? 0 : rand < 0.6 ? 1 : rand < 0.75 ? 2 : rand < 0.88 ? 3 : 4,
    });
  }
  return data;
}
