import React from 'react'
import styled, { css } from 'styled-components'

type BlockProps = {
	fullHeight?: boolean
}

export const Block = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	overflow: hidden;
	box-sizing: border-box;
	${(props: BlockProps) => props.fullHeight && css`
		height: calc(100vh - 105px);
		overflow: auto;
	`}

	&::-webkit-scrollbar {
		width: 5px;
		background: #f4f4f4;
		cursor: pointer;
	}

	&::-webkit-scrollbar-track {
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: #c5c5c5;
	}
`

export const ButtonsHolder = styled.div`
	display: flex;
	justify-content: flex-end;
	& button {
		margin-right: 15px;
		&:last-child{
			margin: 0
		}
	}
`