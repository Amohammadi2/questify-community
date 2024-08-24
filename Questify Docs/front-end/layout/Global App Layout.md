
```mermaid
graph LR
	App.tsx --> H
	subgraph H["@/hocs"]
		withNavLayout["withNavLayout HOC"]
	end
	H --> NL["NavLayout component"]
	subgraph authStore["@/store/auth.store.ts"]
		$isAuthenticated["$isAuthenticated recoil selector"]
	end
	NL --> authStore
	subgraph components["@/components"]
		UserProfileMenu["UserProfileMenu component"]
		subgraph notifs["./notification"]
			NotificationBox["NotificationBox component"]
		end
	end
	NL --> components
```

## `withNavLayout` HOC

just a wrapper that takes a component and renders it along `NavLayout`. It is used in routing configuration to keep a consistent layout across application pages

## `NavLayout` component

Renders the top navbar and its contents. It contains the `UserProfileMenu` & `NotificationBox` components as well, therefore these components are rendered on all pages.