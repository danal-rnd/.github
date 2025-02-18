import { Octokit } from '@octokit/rest';

const updateLabel = async ({github, context}) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  const org = process.env.GITHUB_REPOSITORY_OWNER;

  // organization의 모든 저장소 조회
  async function* getAllRepos() {
    let page = 1;
    while (true) {
      const {data} = await octokit.repos.listForOrg({
        org,
        per_page: 100,
        page
      });
      if (data.length === 0) break;
      yield* data;
      page++;
    }
  }

  // 각 저장소 순회
  for await (const repo of getAllRepos()) {
    if (repo.archived) continue;

    // 저장소의 모든 이슈와 PR 조회
    const {data: issues} = await octokit.issues.listForRepo({
      owner: org,
      repo: repo.name,
      state: 'open',
      per_page: 100
    });

    // 각 이슈/PR의 D-Day 라벨 처리
    for (const issue of issues) {
      const dDayLabel = issue.labels.find(label => /^D-\d+$/.test(label.name));
      if (!dDayLabel) continue;

      const currentDay = parseInt(dDayLabel.name.split('-')[1]);
      // D-0인 경우 건너뛰기
      if (currentDay === 0) continue;

      const newDay = currentDay - 1;

      // 기존 라벨 정보 가져오기
      const {data: labels} = await octokit.issues.listLabelsForRepo({
        owner: org,
        repo: repo.name
      });

      // 수정된 코드
      const newDayLabel = labels.find(label => label.name === `D-${newDay}`);
      const defaultDDayLabel = labels.find(label => /^D-\d+$/.test(label.name));

      // 기존 D-Day 라벨 제거
      await octokit.issues.removeLabel({
        owner: org,
        repo: repo.name,
        issue_number: issue.number,
        name: dDayLabel.name
      });

      // 새로운 D-Day 라벨 추가
      await octokit.issues.addLabels({
        owner: org,
        repo: repo.name,
        issue_number: issue.number,
        labels: [`D-${newDay}`]
      });
    }
  }
};

const context = {
  repo: {
    owner: process.env.GITHUB_REPOSITORY_OWNER
  }
};
updateLabel({ github: {}, context })