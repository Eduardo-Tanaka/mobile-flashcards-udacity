import glamorous from 'glamorous-native'

export const MyStyledView = glamorous.view(
	{
	  flex: 1,
	},
	(props) => ({
    padding: props.noPadding ? 0 : 10,
    justifyContent: props.justifyContent ? props.justifyContent : null,
    alignItems: props.alignItems ? props.alignItems : null
  })
)