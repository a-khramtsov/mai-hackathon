import React from 'react'
import Input from 'components/Common/Controls/Input'
import styled, { css } from 'styled-components'

export const StyledInput = styled(Input) <{ error?: boolean }>`
	${p =>
		p.error &&
		css`
			border: 1px solid red;
		`}
`

export const InputWrapper = styled.div``
