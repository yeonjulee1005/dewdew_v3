# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


## Node Version

```
노드 버전은 아래중에 선택하여 사용 바랍니다.
권장: v18.15
```

## Branch Rules

브랜치는 총 4단계로 운영됩니다.
1. master: 운영환경
2. stage: stage 환경 (운영 배포 전 최종 확인브랜치)
3. develop: dev 환경
4. issue branches: 각 이슈마다 생성되는 브랜치

## Bun Set up 방법

`Bun`은(npm, yarn과 같은) 패키지 매니저로, 아래와 같이 설정해주시면 됩니다.

여기서 자세한 정보 확인가능해요~ [Bun 공식 사이트](https://bun.sh/)


1. 터미널에 `curl -fsSL https://bun.sh/install | bash` 해당 커맨드로 bun 설치
2. 설치후 터미널에 각자 사용하는 쉘 설정파일 (.bashrc, .zshrc 등) 최하단에 자동으로 커맨드가 삽입됩니다.

```
# bun completions
[ -s "/Users/dewdew/.bun/_bun" ] && source "/Users/dewdew/.bun/_bun"

# bun
export BUN_INSTALL="/${HOME}/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

3. .zshrc(이하 .zsh 로 설명할게요!)에 진입하여 다음과 같이 수정하고 저장해줍니다.
```
export BUN_INSTALL="/user/컴퓨터 작업영역이름/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

4. `source ~/.zshrc` 실행 후, bun 커맨드를 사용할 수 있습니다.

## Bun 커맨드
> `bun --version`
> `bun --help`

## Bun 알려진 문제점
> Element Plus 에서 사용하는 @popperjs/core 가 정상적으로 빌드되지 않는 현상이 발생.
> 아래의 dependency를 `package.json` 에 추가 후 `bun install` 해주면 해결됨
> `"@popperjs/core": "npm:@sxzz/popperjs-es@^2.11.6"`

## Setup
Make sure to install the dependencies:

> `bun install`

## Development Server
Start the development server on http://localhost:3000

> `bun dev`

## Production
Build the application for production:

> `bun run build`

Locally preview production build:

> `bun run preview`


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 셋업이 진행 안될 경우 조치사항
```
bun.lockb, node_modules 삭제, .nuxt 삭제
-> bun install 진행
```
```
rm -rf node_modules
rm -rf bun.lockb
rm -rf .nuxt
bun pm cache rm
bun install
```
> `bun install` 실행

## Nuxt 패키지 정보확인
> `npx nuxi info`

## Supabase Cli 셋업
```
패키지 설치
```
> `bun add supabase@`

```
로그인 및 토큰 확인 url
https://supabase.com/dashboard/account/tokens
```
> `bun supabase:login`

```
Typescript 자동생성
```
> `bun supabase gen types typescript --project-id "PROJECT Reference ID" --schema public > types/supabase.ts`



## Code-Server 포트 설정방법(devTool 내 vscode 실행방법)
> `PORT=3080 code-server`

## Code-Server 설치 방법
> `brew install code-server` 및 하단 링크 참조
> [참조링크1:vscode server](https://code.visualstudio.com/docs/remote/vscode-server)
> [참조링크2:tunnels](https://code.visualstudio.com/docs/remote/tunnels#_using-the-vs-code-ui)

## Nuxt3 Edge Channel 설정법
> `package.json` 내에 `"nuxt": "npm:nuxt3@latest"` 처리
