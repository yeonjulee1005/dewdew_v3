## 기본 셋업 방법

## Setup

Make sure to install the dependencies:

```zsh
# yarn
bun install
```

## Development Server

```zsh
bun run dev
```

## Production

Build the application for production:

```zsh
bun run build
```

Locally preview production build:

```zsh
bun preview
```

## 버전 관리 커맨드

```zsh
npm version patch //0.0.x
npm version minor //0.x.0
npm version major //x.0.0
```

## 셋업이 진행 안될 경우 조치사항
```zsh
// bun.lockb, node_modules 삭제, .nuxt 삭제 
bun install 진행
```

```zsh
rm -rf node_modules
rm -rf yarn.lock
rm -rf .nuxt
bun pm cache rm
bun install
```

## Supabase Cli 셋업

#### 패키지 설치
```zsh
bun add supabase@">=1.8.1" --dev
```

#### 로그인 및 토큰 확인 url
> https://supabase.com/dashboard/account/tokens

```zsh
bun supabase:login
```

#### Typescript 자동생성
> `package.json` 스크립트 영역에 아래와 같이 추가
```package.json
"supabase:type": "supabase gen types typescript --project-id ${PROJECT Reference ID} --schema public > types/supabase.ts"
```


## Nuxt 패키지 정보확인
```zsh
npx nuxi info
```

## Code-Server 포트 설정방법(devTool 내 vscode 실행방법)
```zsh
PORT=3080 code-server
```

## Code-Server 설치 방법
```zsh
brew install code-server
```
> 하단 링크 참조
> [참조링크1:vscode server](https://code.visualstudio.com/docs/remote/vscode-server)
> [참조링크2:tunnels](https://code.visualstudio.com/docs/remote/tunnels#_using-the-vs-code-ui)

## Nuxt3 Edge Channel 설정법
> `package.json` 내에 `"nuxt": "npm:nuxt3@latest"` 처리
