# 🙋‍♀️ Welcome to Danal GitHub!

## 📝 참고 사이트
- [Nexus](https://nexus.danal.co.kr) - Artifact 저장소
- [SonarQube](https://sonarqube.danal.co.kr) - 코드 정적분석 툴
- [Confluence](https://danal.atlassian.net/wiki)

## ⚙️ 개발환경 세팅법
개발환경 세팅법은 [local-dev-settings Repository](../../../local-dev-settings/wiki)을 참고해주시기 바랍니다.  

## ❔ FAQ
### 개발 GitHub에 push한 내용이 운영 GitHub(GHES)에 반영되지 않은 것 같아요!
> 기본적으로 `master`, `develop`, `release` branch가 운영 GitHub로 이관됩니다.  
> 해당하는 branch이지만 이관되지 않았다면 GitHub 담당자에게 문의해주시기 바랍니다.

> **Force push**를 한 경우 운영 GitHub 이관 중 conflict가 발생하므로 이관이 되지 않습니다.  
> 이 경우 GitHub 담당자에게 요청주시기 바랍니다.

### 운영 GitHub(GHES) 비밀번호 재설정이 필요해요!
> 아래와 같이 GHES 패스워드 리셋을 하시면 됩니다.
> 1. (전산망) GHES의 로그인 화면에서 `Forgot Password?` 링크를 통해 이메일로 비밀번호 재설정 링크를 보냅니다.
> 2. (연구개발망) 이메일로 온 비밀번호 재설정 링크를 [패스워드 재설정용 이슈로 생성](../../../ghes_password_reset/issues)합니다.
> 3. GitHub 담당자에게 GHES 패스워드 리셋을 요청합니다.
